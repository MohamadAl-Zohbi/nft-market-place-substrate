use super::*;
use frame_support::ensure;
use sp_runtime::{DispatchError, DispatchResult};

impl<T: Config> Pallet<T> {
	pub fn do_transfer(
		collection: T::CollectionId,
		item: T::ItemId,
		dest: T::AccountId,
		with_details: impl FnOnce(&CollectionDetailsFor<T>, &mut ItemDetailsFor<T>) -> DispatchResult,
	) -> DispatchResult {
		let collection_details =
			Collection::<T>::get(&collection).ok_or(Error::<T>::UnknownCollection)?;
		ensure!(!collection_details.is_frozen, Error::<T>::Frozen);

		let mut details =
			Item::<T>::get(&collection, &item).ok_or(Error::<T>::UnknownCollection)?;
		ensure!(!details.is_frozen, Error::<T>::Frozen);
		with_details(&collection_details, &mut details)?;

		Account::<T>::remove((&details.owner, &collection, &item));
		Account::<T>::insert((&dest, &collection, &item), ());
		let origin = details.owner;
		details.owner = dest;
		Item::<T>::insert(&collection, &item, &details);

		Self::deposit_event(Event::Transferred {
			collection,
			item,
			from: origin,
			to: details.owner,
		});
		Ok(())
	}

	pub fn do_create_collection(
		collection: T::CollectionId,
		owner: T::AccountId,
	) -> DispatchResult {
		ensure!(!Collection::<T>::contains_key(collection), Error::<T>::InUse);

		Collection::<T>::insert(
			collection,
			CollectionDetails {
				owner: owner.clone(),
				items: 0,
				is_frozen: false,
			},
		);

		CollectionAccount::<T>::insert(&owner, &collection, ());
		Ok(())
	}

	pub fn do_mint(
		collection: T::CollectionId,
		item: T::ItemId,
		owner: T::AccountId,
		with_details: impl FnOnce(&CollectionDetailsFor<T>) -> DispatchResult,
	) -> DispatchResult {
		ensure!(!Item::<T>::contains_key(collection, item), Error::<T>::AlreadyExists);

		Collection::<T>::try_mutate(
			&collection,
			|maybe_collection_details| -> DispatchResult {
				let collection_details =
					maybe_collection_details.as_mut().ok_or(Error::<T>::UnknownCollection)?;

				with_details(collection_details)?;

				if let Ok(max_supply) = CollectionMaxSupply::<T>::try_get(&collection) {
					ensure!(collection_details.items < max_supply, Error::<T>::MaxSupplyReached);
				}

				let items =
					collection_details.items.checked_add(1).ok_or(ArithmeticError::Overflow)?;
				collection_details.items = items;

				let owner = owner.clone();
				Account::<T>::insert((&owner, &collection, &item), ());
				let details = ItemDetails { owner,is_frozen: false };
				Item::<T>::insert(&collection, &item, details);
				Ok(())
			},
		)?;

		Ok(())
	}

	pub fn do_burn(
		collection: T::CollectionId,
		item: T::ItemId,
		with_details: impl FnOnce(&CollectionDetailsFor<T>) -> DispatchResult,
	) -> DispatchResult {
		let owner = Collection::<T>::try_mutate(
			&collection,
			|maybe_collection_details| -> Result<T::AccountId, DispatchError> {
				let collection_details =
					maybe_collection_details.as_mut().ok_or(Error::<T>::UnknownCollection)?;
				let details = Item::<T>::get(&collection, &item)
					.ok_or(Error::<T>::UnknownCollection)?;
				with_details(collection_details)?;
				collection_details.items.saturating_dec();
				Ok(details.owner)
			},
		)?;

		Item::<T>::remove(&collection, &item);
		Account::<T>::remove((&owner, &collection, &item));
		Self::deposit_event(Event::Burned { collection, item, owner });
		Ok(())
	}
}
