#![recursion_limit = "256"]
#![cfg_attr(not(feature = "std"), no_std)]
mod functions;
mod impl_nonfungibles;
mod types;
pub mod weights;
use codec::{Decode, Encode};
use frame_system::Config as SystemConfig;
use sp_runtime::{traits::Saturating, ArithmeticError, RuntimeDebug};
use sp_std::prelude::*;

pub use pallet::*;
pub use types::*;
pub use weights::WeightInfo;

#[frame_support::pallet]
pub mod pallet {

	use super::*;
	use frame_support::pallet_prelude::*;
	use frame_system::pallet_prelude::*;

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);

	#[pallet::config]

	pub trait Config: frame_system::Config {
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

		type CollectionId: Member + Parameter + MaxEncodedLen + Copy + From<u32> + Into<u32>;
		type ItemId: Member + Parameter + MaxEncodedLen + Copy + From<u32> + Into<u32>;
		type ForceOrigin: EnsureOrigin<Self::RuntimeOrigin>;

		#[pallet::constant]
		type StringLimit: Get<u32>;
		type WeightInfo: WeightInfo;
	}

	#[pallet::storage]
	#[pallet::storage_prefix = "Class"]
	pub(super) type Collection<T: Config> =
		StorageMap<_, Blake2_128Concat, T::CollectionId, CollectionDetails<T::AccountId>>;

	#[pallet::storage]
	pub(super) type OwnershipAcceptance<T: Config> =
		StorageMap<_, Blake2_128Concat, T::AccountId, T::CollectionId>;
	#[pallet::storage]
	pub(super) type Account<T: Config> = StorageNMap<
		_,
		(
			NMapKey<Blake2_128Concat, T::AccountId>,
			NMapKey<Blake2_128Concat, T::CollectionId>,
			NMapKey<Blake2_128Concat, T::ItemId>,
		),
		(),
		OptionQuery,
	>;
	#[pallet::storage]
	#[pallet::storage_prefix = "ClassAccount"]
	pub(super) type CollectionAccount<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		Blake2_128Concat,
		T::CollectionId,
		(),
		OptionQuery,
	>;
	#[pallet::storage]
	#[pallet::storage_prefix = "Asset"]
	pub(super) type Item<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		T::CollectionId,
		Blake2_128Concat,
		T::ItemId,
		ItemDetails<T::AccountId>,
		OptionQuery,
	>;

	#[pallet::storage]
	#[pallet::storage_prefix = "ClassMetadataOf"]
	pub(super) type CollectionMetadataOf<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::CollectionId,
		CollectionMetadata<T::StringLimit>,
		OptionQuery,
	>;
	#[pallet::storage]
	#[pallet::storage_prefix = "InstanceMetadataOf"]
	pub(super) type ItemMetadataOf<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		T::CollectionId,
		Blake2_128Concat,
		T::ItemId,
		ItemMetadata<T::StringLimit>,
		OptionQuery,
	>;

	#[pallet::storage]
	pub(super) type CollectionMaxSupply<T: Config> =
		StorageMap<_, Blake2_128Concat, T::CollectionId, u32, OptionQuery>;
	#[pallet::storage]
	#[pallet::getter(fn next_collection_id)]
	pub type NextCollectionId<T: Config> = StorageValue<_, T::CollectionId>;
	#[pallet::storage]
	#[pallet::getter(fn next_nft_id)]
	pub type NextItemId<T: Config> = StorageMap<_, Twox64Concat, T::CollectionId, T::ItemId>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		Created {
			collection: T::CollectionId,
			owner: T::AccountId,
			data: BoundedVec<u8, T::StringLimit>,
		},

		Destroyed {
			collection: T::CollectionId,
		},

		Issued {
			collection: T::CollectionId,
			item: T::ItemId,
			owner: T::AccountId,
			data: BoundedVec<u8, T::StringLimit>,
		},

		Transferred {
			collection: T::CollectionId,
			item: T::ItemId,
			from: T::AccountId,
			to: T::AccountId,
		},

		Burned {
			collection: T::CollectionId,
			item: T::ItemId,
			owner: T::AccountId,
		},

		Frozen {
			collection: T::CollectionId,
			item: T::ItemId,
		},
		CollectionFrozen {
			collection: T::CollectionId,
		},
		OwnerChanged {
			collection: T::CollectionId,
			new_owner: T::AccountId,
		},
		CollectionMaxSupplySet {
			collection: T::CollectionId,
			max_supply: u32,
		},
	}

	#[pallet::error]
	pub enum Error<T> {
		NoPermission,
		UnknownCollection,
		AlreadyExists,
		WrongOwner,
		Frozen,
		Locked,
		MaxSupplyReached,
		MaxSupplyAlreadySet,
		InUse,
		Unaccepted,
		MaxSupplyTooSmall,
		UnknownItem,
	}

	impl<T: Config> Pallet<T> {
		pub fn owner(collection: T::CollectionId, item: T::ItemId) -> Option<T::AccountId> {
			Item::<T>::get(collection, item).map(|i| i.owner)
		}

		pub fn collection_owner(collection: T::CollectionId) -> Option<T::AccountId> {
			Collection::<T>::get(collection).map(|i| i.owner)
		}
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		#[pallet::call_index(0)]
		#[pallet::weight(T::WeightInfo::create())]
		pub fn create(
			origin: OriginFor<T>,
			data: BoundedVec<u8, T::StringLimit>,
			is_frozen: bool,
		) -> DispatchResult {
			let owner: T::AccountId = ensure_signed(origin)?;
			let collection: T::CollectionId =
				NextCollectionId::<T>::get().unwrap_or(T::CollectionId::from(1));
			Self::do_create_collection(collection, owner.clone())?;
			CollectionMetadataOf::<T>::insert(
				collection,
				CollectionMetadata { data: data.clone(), is_frozen },
			);
			NextCollectionId::<T>::put(T::CollectionId::from(
				Into::<u32>::into(collection) + 1_u32,
			));
			Self::deposit_event(Event::Created { collection, owner, data });
			Ok(())
		}

		#[pallet::call_index(1)]
		#[pallet::weight(T::WeightInfo::mint())]
		pub fn mint(
			origin: OriginFor<T>,
			collection: T::CollectionId,
			owner: T::AccountId,
			data: BoundedVec<u8, T::StringLimit>,
			is_frozen: bool,
		) -> DispatchResult {
			let origin = ensure_signed(origin)?;
			let item: T::ItemId = NextItemId::<T>::get(collection).unwrap_or(T::ItemId::from(1));
			Self::do_mint(collection, item, owner.clone(), |collection_details| {
				ensure!(collection_details.owner == origin, Error::<T>::NoPermission);
				Ok(())
			})?;
			ItemMetadataOf::<T>::insert(
				collection,
				item,
				ItemMetadata { data: data.clone(), is_frozen },
			);
			NextItemId::<T>::insert(collection, T::ItemId::from(Into::<u32>::into(item) + 1_u32));
			Self::deposit_event(Event::Issued { collection, item, owner, data });
			Ok(())
		}

		#[pallet::call_index(2)]
		#[pallet::weight(T::WeightInfo::burn())]
		pub fn burn(
			origin: OriginFor<T>,
			collection: T::CollectionId,
			item: T::ItemId,
		) -> DispatchResult {
			let origin = ensure_signed(origin)?;
			Self::do_burn(collection, item, |collection_details| {
				ensure!(collection_details.owner == origin, Error::<T>::NoPermission);
				Ok(())
			})
		}

		#[pallet::call_index(3)]
		#[pallet::weight(T::WeightInfo::transfer())]
		pub fn transfer(
			origin: OriginFor<T>,
			collection: T::CollectionId,
			item: T::ItemId,
			dest: T::AccountId,
		) -> DispatchResult {
			let origin = ensure_signed(origin)?;
			Self::do_transfer(collection, item, dest, |_collection_details, details| {
				ensure!(origin == details.owner, Error::<T>::NoPermission);
				Ok(())
			})
		}

		#[pallet::call_index(4)]
		#[pallet::weight(T::WeightInfo::freeze())]
		pub fn freeze(
			origin: OriginFor<T>,
			collection: T::CollectionId,
			item: T::ItemId,
		) -> DispatchResult {
			let origin = ensure_signed(origin)?;
			let mut details =
				Item::<T>::get(&collection, &item).ok_or(Error::<T>::UnknownCollection)?;
			let collection_details =
				Collection::<T>::get(&collection).ok_or(Error::<T>::UnknownCollection)?;
			ensure!(collection_details.owner == origin, Error::<T>::NoPermission);

			details.is_frozen = true;
			Item::<T>::insert(&collection, &item, &details);

			Self::deposit_event(Event::<T>::Frozen { collection, item });
			Ok(())
		}

		#[pallet::call_index(5)]
		#[pallet::weight(T::WeightInfo::freeze_collection())]
		pub fn freeze_collection(
			origin: OriginFor<T>,
			collection: T::CollectionId,
		) -> DispatchResult {
			let origin = ensure_signed(origin)?;
			Collection::<T>::try_mutate(collection, |maybe_details| {
				let details = maybe_details.as_mut().ok_or(Error::<T>::UnknownCollection)?;
				ensure!(origin == details.owner, Error::<T>::NoPermission);

				details.is_frozen = true;

				Self::deposit_event(Event::<T>::CollectionFrozen { collection });
				Ok(())
			})
		}

		#[pallet::call_index(6)]
		#[pallet::weight(T::WeightInfo::transfer_ownership())]
		pub fn transfer_ownership(
			origin: OriginFor<T>,
			collection: T::CollectionId,
			owner: T::AccountId,
		) -> DispatchResult {
			let origin = ensure_signed(origin)?;

			let acceptable_collection = OwnershipAcceptance::<T>::get(&owner);
			ensure!(acceptable_collection.as_ref() == Some(&collection), Error::<T>::Unaccepted);

			Collection::<T>::try_mutate(collection, |maybe_details| {
				let details = maybe_details.as_mut().ok_or(Error::<T>::UnknownCollection)?;
				ensure!(origin == details.owner, Error::<T>::NoPermission);
				if details.owner == owner {
					return Ok(());
				}
				CollectionAccount::<T>::remove(&details.owner, &collection);
				CollectionAccount::<T>::insert(&owner, &collection, ());
				details.owner = owner.clone();
				OwnershipAcceptance::<T>::remove(&owner);
				Self::deposit_event(Event::OwnerChanged { collection, new_owner: owner });
				Ok(())
			})
		}

		#[pallet::call_index(7)]
		#[pallet::weight(T::WeightInfo::set_collection_max_supply())]
		pub fn set_collection_max_supply(
			origin: OriginFor<T>,
			collection: T::CollectionId,
			max_supply: u32,
		) -> DispatchResult {
			let maybe_check_owner = T::ForceOrigin::try_origin(origin)
				.map(|_| None)
				.or_else(|origin| ensure_signed(origin).map(Some))?;

			ensure!(
				!CollectionMaxSupply::<T>::contains_key(&collection),
				Error::<T>::MaxSupplyAlreadySet
			);

			let details = Collection::<T>::get(&collection).ok_or(Error::<T>::UnknownCollection)?;
			if let Some(check_owner) = &maybe_check_owner {
				ensure!(check_owner == &details.owner, Error::<T>::NoPermission);
			}
			ensure!(details.items <= max_supply, Error::<T>::MaxSupplyTooSmall);
			CollectionMaxSupply::<T>::insert(&collection, max_supply);
			Self::deposit_event(Event::CollectionMaxSupplySet { collection, max_supply });
			Ok(())
		}
	}
}
