use super::*;
use frame_support::{
	pallet_prelude::{BoundedVec, MaxEncodedLen},
	traits::Get,
};
use scale_info::TypeInfo;

pub(super) type CollectionDetailsFor<T> = CollectionDetails<<T as SystemConfig>::AccountId>;
pub(super) type ItemDetailsFor<T> = ItemDetails<<T as SystemConfig>::AccountId>;

#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
pub struct CollectionDetails<AccountId> {
	pub(super) owner: AccountId,
	pub(super) items: u32,
	pub(super) is_frozen: bool,
}

#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, Default, TypeInfo, MaxEncodedLen)]
pub struct ItemDetails<AccountId> {
	pub(super) owner: AccountId,
	pub(super) is_frozen: bool,
}

#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, Default, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(StringLimit))]
pub struct CollectionMetadata<StringLimit: Get<u32>> {
	pub(super) data: BoundedVec<u8, StringLimit>,
	pub(super) is_frozen: bool,
}

#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, Default, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(StringLimit))]
pub struct ItemMetadata<StringLimit: Get<u32>> {
	pub(super) data: BoundedVec<u8, StringLimit>,
	pub(super) is_frozen: bool,
}
