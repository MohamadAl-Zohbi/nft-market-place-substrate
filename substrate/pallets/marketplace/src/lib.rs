#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
	use frame_support::codec::{Decode, Encode};
	use frame_support::pallet_prelude::*;
	use frame_support::sp_runtime::traits::AccountIdConversion;
	use frame_support::sp_runtime::SaturatedConversion;
	use frame_support::traits::{Currency, ExistenceRequirement, Get, UnixTime};
	use frame_support::PalletId;
	use frame_system::pallet_prelude::*;

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);

	#[pallet::config]
	pub trait Config: frame_system::Config + pallet_nfts::Config {
		type Currency: Currency<Self::AccountId>;
		type UnixTime: UnixTime;
		type PalletId: Get<PalletId>;
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
	}
	#[derive(Encode, Decode, Clone, Eq, PartialEq, MaxEncodedLen, RuntimeDebug, TypeInfo)]
	pub struct Listing<AccountId, Balance> {
		seller: AccountId,
		listing_id: u128,
		price: Balance,
	}
	#[derive(Encode, Decode, Clone, Eq, PartialEq, MaxEncodedLen, RuntimeDebug, TypeInfo)]
	pub struct Auction<AccountId, Balance> {
		seller: AccountId,
		auction_id: u128,
		min_bid: Balance,
		highest_bid: Balance,
		highest_bidder: Option<AccountId>,
		start_date: u64,
		end_date: u64,
		bidder_number: u32,
	}
	#[derive(Encode, Decode, Clone, Eq, PartialEq, MaxEncodedLen, RuntimeDebug, TypeInfo)]
	pub struct Offer<AccountId, Balance, CollectionId, NftId> {
		maker: AccountId,
		reciever: AccountId,
		value: Balance,
		collection_id: CollectionId,
		nft_id: NftId,
	}
	type BalanceOf<T> =
		<<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;
	pub type ItemId<T> = <T as pallet_nfts::Config>::ItemId;
	pub type CollectionId<T> = <T as pallet_nfts::Config>::CollectionId;
	pub type AuctionOf<T> = Auction<<T as frame_system::Config>::AccountId, BalanceOf<T>>;
	pub type OfferOf<T> =
		Offer<<T as frame_system::Config>::AccountId, BalanceOf<T>, CollectionId<T>, ItemId<T>>;
	pub type ListingOf<T> = Listing<<T as frame_system::Config>::AccountId, BalanceOf<T>>;
	#[pallet::storage]
	#[pallet::getter(fn admin_wallet)]
	pub type PalletWallet<T: Config> = StorageValue<_, T::AccountId>;
	#[pallet::storage]
	#[pallet::getter(fn admin_account)]
	pub type Admin<T: Config> = StorageValue<_, T::AccountId>;
	#[pallet::storage]
	#[pallet::getter(fn next_listing_id)]
	pub type NextListingId<T: Config> = StorageValue<_, u128>;
	#[pallet::storage]
	#[pallet::getter(fn next_auction_id)]
	pub type NextAuctionId<T: Config> = StorageValue<_, u128>;
	#[pallet::storage]
	#[pallet::getter(fn next_offer_id)]
	pub type NextOfferId<T: Config> = StorageValue<_, u128>;
	#[pallet::storage]
	#[pallet::getter(fn nft_listing)]
	pub type NftListing<T: Config> =
		StorageDoubleMap<_, Twox64Concat, CollectionId<T>, Twox64Concat, ItemId<T>, ListingOf<T>>;

	#[pallet::storage]
	#[pallet::getter(fn nft_auction)]
	pub type NftAuction<T: Config> =
		StorageDoubleMap<_, Twox64Concat, CollectionId<T>, Twox64Concat, ItemId<T>, AuctionOf<T>>;
	#[pallet::storage]
	#[pallet::getter(fn nft_offer)]
	pub type NftOffer<T: Config> = StorageMap<_, Twox64Concat, u128, OfferOf<T>>;
	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		ItemSold {
			listing_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			price: BalanceOf<T>,
			seller: T::AccountId,
			buyer: T::AccountId,
		},
		ItemListed {
			listing_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			price: BalanceOf<T>,
			seller: T::AccountId,
		},
		CancelListItem {
			listing_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
		},
		StartAuction {
			auction_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			seller: T::AccountId,
			min_bid: BalanceOf<T>,
			start_date: u64,
			end_date: u64,
		},
		AuctionSettled {
			auction_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			price: BalanceOf<T>,
			seller: T::AccountId,
			buyer: T::AccountId,
		},
		AuctionSettledNoBidder {
			auction_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			seller: T::AccountId,
		},
		CancelAuction {
			auction_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			seller: T::AccountId,
		},
		NewBid {
			auction_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			bidder: T::AccountId,
			price: BalanceOf<T>,
		},
		NewOffer {
			offer_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			from: T::AccountId,
			to: T::AccountId,
			price: BalanceOf<T>,
		},
		OfferAccepted {
			offer_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			from: T::AccountId,
			to: T::AccountId,
			price: BalanceOf<T>,
		},
		OfferCanceled {
			offer_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			from: T::AccountId,
			to: T::AccountId,
			price: BalanceOf<T>,
		},
		OfferRejected {
			offer_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			from: T::AccountId,
			to: T::AccountId,
			price: BalanceOf<T>,
		},
		/// when user transfer the nft while he listing it
		FraudSeller {
			listing_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			seller: T::AccountId,
		},
		FraudAuction {
			auction_id: u128,
			collection_id: CollectionId<T>,
			nft_id: ItemId<T>,
			seller: T::AccountId,
		},
	}

	#[pallet::error]
	pub enum Error<T> {
		NoPermission,
		AlreadyListed,
		AlreadyInAuction,
		LowBalance,
		OwnerCantBuyNft,
		NftNotListed,
		AuctionDidNotStartYet,
		AuctionAlreadyStart,
		AuctionHaveBidder,
		AuctionDidNotEndYet,
		AuctionEnded,
		AuctionDateIsIncorrect,
		UnknownItem,
		Fraud,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		#[pallet::call_index(0)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn list_nft(
			origin: OriginFor<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
			price: BalanceOf<T>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			ensure!(
				who.clone() == Self::nft_owner(collection_id, nft_id),
				Error::<T>::NoPermission
			);
			ensure!(
				!NftListing::<T>::contains_key(collection_id, nft_id),
				Error::<T>::AlreadyListed
			);
			ensure!(
				!NftAuction::<T>::contains_key(collection_id, nft_id),
				Error::<T>::AlreadyInAuction
			);
			let current_listing_id = NextListingId::<T>::get().unwrap_or(1);
			let listing: ListingOf<T> =
				Listing { seller: who.clone(), listing_id: current_listing_id, price };
			NftListing::<T>::insert(collection_id, nft_id, listing);
			NextListingId::<T>::put(current_listing_id + 1);
			Self::deposit_event(Event::<T>::ItemListed {
				listing_id: current_listing_id,
				collection_id,
				nft_id,
				price,
				seller: who,
			});
			Ok(())
		}
		#[pallet::call_index(1)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn buy_nft(
			origin: OriginFor<T>,
			price: BalanceOf<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let nft_owner = Self::nft_owner(collection_id, nft_id);
			ensure!(who.clone() != nft_owner, Error::<T>::OwnerCantBuyNft);
			let listing = NftListing::<T>::get(collection_id, nft_id)
				.ok_or(Error::<T>::NftNotListed)
				.unwrap();
			if listing.seller == nft_owner {
				ensure!(price >= listing.price, Error::<T>::LowBalance);
				Self::transfer_currency(&who, &listing.seller, listing.price);
				Self::nft_transfer(collection_id, nft_id, listing.seller.clone(), who.clone());
				NftListing::<T>::remove(collection_id, nft_id);
				Self::deposit_event(Event::<T>::ItemSold {
					listing_id: listing.listing_id,
					collection_id,
					nft_id,
					seller: listing.seller,
					buyer: who,
					price,
				});
			} else {
				NftListing::<T>::remove(collection_id, nft_id);
				Self::deposit_event(Event::<T>::FraudSeller {
					listing_id: listing.listing_id,
					collection_id,
					nft_id,
					seller: listing.seller,
				});
			}

			Ok(())
		}
		#[pallet::call_index(2)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn cancel_listing(
			origin: OriginFor<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let listing = NftListing::<T>::get(collection_id, nft_id)
				.ok_or(Error::<T>::NftNotListed)
				.unwrap();
			ensure!(listing.seller == who.clone(), Error::<T>::NoPermission);
			NftListing::<T>::remove(collection_id, nft_id);
			Self::deposit_event(Event::<T>::CancelListItem {
				listing_id: listing.listing_id,
				collection_id,
				nft_id,
			});
			Ok(())
		}
		#[pallet::call_index(3)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn start_auction(
			origin: OriginFor<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
			min_bid: BalanceOf<T>,
			start_date: u64,
			end_date: u64,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			ensure!(
				who.clone() == Self::nft_owner(collection_id, nft_id),
				Error::<T>::NoPermission
			);
			ensure!(
				!NftListing::<T>::contains_key(collection_id, nft_id),
				Error::<T>::AlreadyListed
			);
			ensure!(
				!NftAuction::<T>::contains_key(collection_id, nft_id),
				Error::<T>::AlreadyInAuction
			);
			let current_auction_id = NextAuctionId::<T>::get().unwrap_or(1);
			ensure!(end_date > start_date, Error::<T>::AuctionDateIsIncorrect);
			let auction = Auction {
				start_date,
				end_date,
				seller: who.clone(),
				auction_id: current_auction_id,
				min_bid,
				highest_bidder: None,
				highest_bid: Self::u32_to_currency_saturated(0),
				bidder_number: 0,
			};
			NftAuction::<T>::insert(collection_id, nft_id, auction);
			Self::deposit_event(Event::<T>::StartAuction {
				auction_id: current_auction_id,
				collection_id,
				nft_id,
				seller: who.clone(),
				min_bid,
				start_date,
				end_date,
			});
			Ok(())
		}
		#[pallet::call_index(4)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn cancel_auction(
			origin: OriginFor<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let auction = NftAuction::<T>::get(collection_id, nft_id)
				.ok_or(Error::<T>::NftNotListed)
				.unwrap();
			ensure!(auction.bidder_number == 0, Error::<T>::AuctionHaveBidder);
			ensure!(auction.seller == who, Error::<T>::NoPermission);
			NftAuction::<T>::remove(collection_id, nft_id);
			Self::deposit_event(Event::<T>::CancelAuction {
				auction_id: auction.auction_id,
				collection_id,
				nft_id,
				seller: who.clone(),
			});
			Ok(())
		}
		#[pallet::call_index(5)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn bid_in_auction(
			origin: OriginFor<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
			price: BalanceOf<T>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let mut auction = NftAuction::<T>::get(collection_id, nft_id)
				.ok_or(Error::<T>::NftNotListed)
				.unwrap();
			ensure!(auction.highest_bid < price, Error::<T>::LowBalance);
			ensure!(auction.start_date < Self::time_now(), Error::<T>::AuctionDidNotStartYet);
			ensure!(auction.end_date > Self::time_now(), Error::<T>::AuctionEnded);
			let wallet_address = PalletWallet::<T>::get().unwrap();
			Self::transfer_currency(&who, &wallet_address, price);
			match auction.highest_bidder {
				Some(account) => {
					Self::transfer_currency(&wallet_address, &account, price);
				},
				None => {},
			}
			auction.highest_bid = price;
			auction.highest_bidder = Some(who.clone());
			auction.bidder_number = auction.bidder_number + 1;
			let current_auction_id = auction.auction_id;
			NftAuction::<T>::insert(collection_id, nft_id, auction);
			Self::deposit_event(Event::<T>::NewBid {
				auction_id: current_auction_id,
				collection_id,
				nft_id,
				price,
				bidder: who.clone(),
			});
			Ok(())
		}
		#[pallet::call_index(6)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn settle_auction(
			origin: OriginFor<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let auction = NftAuction::<T>::get(collection_id, nft_id)
				.ok_or(Error::<T>::NftNotListed)
				.unwrap();
			ensure!(auction.end_date < Self::time_now(), Error::<T>::AuctionDidNotEndYet);
			if auction.bidder_number == 0 && auction.seller == who.clone() {
				Self::deposit_event(Event::<T>::AuctionSettledNoBidder {
					auction_id: auction.auction_id,
					collection_id,
					nft_id,
					seller: who.clone(),
				});
				return Ok(());
			}
			ensure!(
				auction.seller == who.clone() || auction.highest_bidder == Some(who.clone()),
				Error::<T>::NoPermission
			);
			let nft_owner = Self::nft_owner(collection_id, nft_id);
			if nft_owner != auction.seller {
				NftAuction::<T>::remove(collection_id, nft_id);
				Self::deposit_event(Event::<T>::FraudAuction {
					collection_id,
					nft_id,
					seller: auction.seller,
					auction_id: auction.auction_id,
				});
			 Ok(())
			} else {
				let wallet_address = PalletWallet::<T>::get().unwrap();
				Self::transfer_currency(&wallet_address, &auction.seller, auction.highest_bid);
				NftAuction::<T>::remove(collection_id, nft_id);
				let auction_winner = auction.highest_bidder.unwrap();
				Self::nft_transfer(
					collection_id,
					nft_id,
					auction.seller.clone(),
					auction_winner.clone(),
				);
				Self::deposit_event(Event::AuctionSettled {
					auction_id: auction.auction_id,
					collection_id,
					nft_id,
					price: auction.highest_bid,
					seller: auction.seller,
					buyer: auction_winner,
				});
			Ok(())
			}
		}
		#[pallet::call_index(7)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn create_offer(
			origin: OriginFor<T>,
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
			price: BalanceOf<T>,
			to: T::AccountId,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let nft_owner = Self::nft_owner(collection_id, nft_id);
			ensure!(nft_owner != who, Error::<T>::OwnerCantBuyNft);
			let current_offer_id = NextOfferId::<T>::get().unwrap_or(1);
			let wallet_address = PalletWallet::<T>::get().unwrap();
			Self::transfer_currency(&who, &wallet_address, price);
			NftOffer::<T>::insert(
				current_offer_id,
				Offer {
					maker: who.clone(),
					reciever: nft_owner.clone(),
					value: price,
					collection_id,
					nft_id,
				},
			);
			NextOfferId::<T>::put(current_offer_id + 1);
			Self::deposit_event(Event::NewOffer {
				offer_id: current_offer_id,
				collection_id,
				nft_id,
				price,
				from: who,
				to,
			});
			Ok(())
		}
		#[pallet::call_index(8)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn accept_offer(origin: OriginFor<T>, offer_id: u128) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let offer = NftOffer::<T>::get(offer_id).unwrap();
			ensure!(offer.reciever == who, Error::<T>::NoPermission);
			let wallet_address = PalletWallet::<T>::get().unwrap();
			Self::transfer_currency(&wallet_address, &who, offer.value);
			Self::nft_transfer(
				offer.collection_id,
				offer.nft_id,
				offer.reciever.clone(),
				offer.maker,
			);
			NftOffer::<T>::remove(offer_id);
			Self::deposit_event(Event::OfferAccepted {
				offer_id,
				collection_id: offer.collection_id,
				nft_id: offer.nft_id,
				price: offer.value,
				from: who,
				to: offer.reciever,
			});
			Ok(())
		}
		#[pallet::call_index(9)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn reject_offer(origin: OriginFor<T>, offer_id: u128) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let offer: OfferOf<T> = NftOffer::<T>::get(offer_id).unwrap();
			ensure!(offer.reciever == who, Error::<T>::NoPermission);
			NftOffer::<T>::remove(offer_id);
			let wallet_address = PalletWallet::<T>::get().unwrap();
			Self::transfer_currency(&wallet_address,&offer.maker,offer.value);
			Self::deposit_event(Event::OfferRejected {
				offer_id,
				collection_id: offer.collection_id,
				nft_id: offer.nft_id,
				price: offer.value,
				from: who.clone(),
				to: offer.reciever,
			});
			Ok(())
		}
		#[pallet::call_index(10)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1).ref_time())]
		pub fn cancel_offer(origin: OriginFor<T>, offer_id: u128) -> DispatchResult {
			let who = ensure_signed(origin)?;
			let offer: OfferOf<T> = NftOffer::<T>::get(offer_id).unwrap();
			ensure!(offer.maker == who, Error::<T>::NoPermission);
			NftOffer::<T>::remove(offer_id);
			let wallet_address = PalletWallet::<T>::get().unwrap();
			Self::transfer_currency(&wallet_address,&offer.maker,offer.value);
			Self::deposit_event(Event::OfferCanceled {
				offer_id,
				collection_id: offer.collection_id,
				nft_id: offer.nft_id,
				price: offer.value,
				from: who.clone(),
				to: offer.reciever,
			});
			Ok(())
		}
		#[pallet::call_index(11)]
		#[pallet::weight(0)]
		pub fn register_admin(origin: OriginFor<T>) -> DispatchResult {
			let who = ensure_signed(origin)?;
			match PalletWallet::<T>::get() {
				Some(_) => return Err(Error::<T>::NoPermission.into()),
				None => {
					<Admin<T>>::put(who.clone());
					let wallet_account = Self::pallet_account();
					<PalletWallet<T>>::put(wallet_account.clone());
					T::Currency::deposit_creating(
						&wallet_account,
						Self::u32_to_currency_saturated(10000000),
					);
				},
			};
			Ok(())
		}
	}
	impl<T: Config> Pallet<T> {
		fn pallet_account() -> T::AccountId {
			T::PalletId::get().into_account_truncating()
		}
		fn nft_owner(collection_id: T::CollectionId, nft_id: T::ItemId) -> T::AccountId {
			pallet_nfts::Pallet::<T>::owner(collection_id, nft_id).unwrap()
		}
		fn nft_transfer(
			collection_id: T::CollectionId,
			nft_id: T::ItemId,
			from: T::AccountId,
			to: T::AccountId,
		) {
			pallet_nfts::Pallet::<T>::do_transfer(
				collection_id,
				nft_id,
				to,
				|_collection_details, _details| {
					let owner = Self::nft_owner(collection_id, nft_id);
					ensure!(owner == from, Error::<T>::NoPermission);
					Ok(())
				},
			)
			.unwrap();
		}
		fn transfer_currency(from: &T::AccountId, to: &T::AccountId, amount: BalanceOf<T>) {
			T::Currency::transfer(&from, &to, amount, ExistenceRequirement::KeepAlive).unwrap();
		}
		fn time_now() -> u64 {
			T::UnixTime::now().as_millis().saturated_into::<u64>()
		}
		pub fn u32_to_currency_saturated(input: u32) -> BalanceOf<T> {
			input.saturated_into::<BalanceOf<T>>()
		}
	}
}
