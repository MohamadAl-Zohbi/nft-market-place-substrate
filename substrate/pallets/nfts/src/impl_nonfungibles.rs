use super::*;
use frame_support::{storage::KeyPrefixIterator, traits::tokens::nonfungibles::*};
use sp_runtime::DispatchResult;
use sp_std::prelude::*;

impl<T: Config> Inspect<<T as SystemConfig>::AccountId> for Pallet<T> {
	type ItemId = T::ItemId;
	type CollectionId = T::CollectionId;

	fn owner(
		collection: &Self::CollectionId,
		item: &Self::ItemId,
	) -> Option<<T as SystemConfig>::AccountId> {
		Item::<T>::get(collection, item).map(|a| a.owner)
	}

	fn collection_owner(collection: &Self::CollectionId) -> Option<<T as SystemConfig>::AccountId> {
		Collection::<T>::get(collection).map(|a| a.owner)
	}

}

impl<T: Config> Create<<T as SystemConfig>::AccountId> for Pallet<T> {

	fn create_collection(collection: &Self::CollectionId, who: &T::AccountId, _admin: &T::AccountId) -> DispatchResult {

		Self::do_create_collection(
			*collection,
			who.clone(),
		)
	}
}



impl<T: Config> Mutate<<T as SystemConfig>::AccountId> for Pallet<T> {
	fn mint_into(
		collection: &Self::CollectionId,
		item: &Self::ItemId,
		who: &T::AccountId,
	) -> DispatchResult {
		Self::do_mint(*collection, *item, who.clone(), |_| Ok(()))
	}

	fn burn(
		collection: &Self::CollectionId,
		item: &Self::ItemId,
		_maybe_check_owner: Option<&T::AccountId>,
	) -> DispatchResult {
		Self::do_burn(*collection, *item, |_| {
			Ok(())
		})
	}
}

impl<T: Config> Transfer<T::AccountId> for Pallet<T> {
	fn transfer(
		collection: &Self::CollectionId,
		item: &Self::ItemId,
		destination: &T::AccountId,
	) -> DispatchResult {
		Self::do_transfer(*collection, *item, destination.clone(), |_, _| Ok(()))
	}
}

impl<T: Config> InspectEnumerable<T::AccountId> for Pallet<T> {
	type CollectionsIterator = KeyPrefixIterator<<T as Config>::CollectionId>;
	type ItemsIterator = KeyPrefixIterator<<T as Config>::ItemId>;
	type OwnedIterator =
		KeyPrefixIterator<(<T as Config>::CollectionId, <T as Config>::ItemId)>;
	type OwnedInCollectionIterator = KeyPrefixIterator<<T as Config>::ItemId>;

	fn collections() -> Self::CollectionsIterator {
		CollectionMetadataOf::<T>::iter_keys()
	}

	fn items(collection: &Self::CollectionId) -> Self::ItemsIterator {
		ItemMetadataOf::<T>::iter_key_prefix(collection)
	}

	fn owned(who: &T::AccountId) -> Self::OwnedIterator {
		Account::<T>::iter_key_prefix((who,))
	}


	fn owned_in_collection(
		collection: &Self::CollectionId,
		who: &T::AccountId,
	) -> Self::OwnedInCollectionIterator {
		Account::<T>::iter_key_prefix((who, collection))
	}
}
