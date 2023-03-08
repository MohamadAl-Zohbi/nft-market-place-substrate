#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::{Weight, constants::RocksDbWeight}};
use sp_std::marker::PhantomData;

pub trait WeightInfo {
	fn create() -> Weight;
	fn force_create() -> Weight;
	fn mint() -> Weight;
	fn burn() -> Weight;
	fn transfer() -> Weight;
	fn freeze() -> Weight;
	fn freeze_collection() -> Weight;
	fn transfer_ownership() -> Weight;
	fn set_collection_max_supply() -> Weight;
}

pub struct SubstrateWeight<T>(PhantomData<T>);
impl<T: frame_system::Config> WeightInfo for SubstrateWeight<T> {


	fn create() -> Weight {

		Weight::from_ref_time(35_935_000 as u64)
			.saturating_add(T::DbWeight::get().reads(1 as u64))
			.saturating_add(T::DbWeight::get().writes(2 as u64))
	}


	fn force_create() -> Weight {

		Weight::from_ref_time(23_235_000 as u64)
			.saturating_add(T::DbWeight::get().reads(1 as u64))
			.saturating_add(T::DbWeight::get().writes(2 as u64))
	}






	fn mint() -> Weight {

		Weight::from_ref_time(45_746_000 as u64)
			.saturating_add(T::DbWeight::get().reads(3 as u64))
			.saturating_add(T::DbWeight::get().writes(3 as u64))
	}

	fn burn() -> Weight {

		Weight::from_ref_time(46_994_000 as u64)
			.saturating_add(T::DbWeight::get().reads(2 as u64))
			.saturating_add(T::DbWeight::get().writes(4 as u64))
	}

	fn transfer() -> Weight {

		Weight::from_ref_time(36_375_000 as u64)
			.saturating_add(T::DbWeight::get().reads(2 as u64))
			.saturating_add(T::DbWeight::get().writes(4 as u64))
	}


	fn freeze() -> Weight {

		Weight::from_ref_time(29_280_000 as u64)
			.saturating_add(T::DbWeight::get().reads(2 as u64))
			.saturating_add(T::DbWeight::get().writes(1 as u64))
	}

	fn freeze_collection() -> Weight {

		Weight::from_ref_time(24_742_000 as u64)
			.saturating_add(T::DbWeight::get().reads(1 as u64))
			.saturating_add(T::DbWeight::get().writes(1 as u64))
	}

	fn transfer_ownership() -> Weight {

		Weight::from_ref_time(33_201_000 as u64)
			.saturating_add(T::DbWeight::get().reads(2 as u64))
			.saturating_add(T::DbWeight::get().writes(4 as u64))
	}



	fn set_collection_max_supply() -> Weight {

		Weight::from_ref_time(26_893_000 as u64)
			.saturating_add(T::DbWeight::get().reads(2 as u64))
			.saturating_add(T::DbWeight::get().writes(1 as u64))
	}




}

impl WeightInfo for () {
	fn create() -> Weight {

		Weight::from_ref_time(35_935_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(1 as u64))
			.saturating_add(RocksDbWeight::get().writes(2 as u64))
	}
	fn force_create() -> Weight {

		Weight::from_ref_time(23_235_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(1 as u64))
			.saturating_add(RocksDbWeight::get().writes(2 as u64))
	}

	fn mint() -> Weight {

		Weight::from_ref_time(45_746_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(3 as u64))
			.saturating_add(RocksDbWeight::get().writes(3 as u64))
	}
	fn burn() -> Weight {

		Weight::from_ref_time(46_994_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(2 as u64))
			.saturating_add(RocksDbWeight::get().writes(4 as u64))
	}

	fn transfer() -> Weight {

		Weight::from_ref_time(36_375_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(2 as u64))
			.saturating_add(RocksDbWeight::get().writes(4 as u64))
	}

	fn freeze() -> Weight {

		Weight::from_ref_time(29_280_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(2 as u64))
			.saturating_add(RocksDbWeight::get().writes(1 as u64))
	}



	fn freeze_collection() -> Weight {

		Weight::from_ref_time(24_742_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(1 as u64))
			.saturating_add(RocksDbWeight::get().writes(1 as u64))
	}


	fn transfer_ownership() -> Weight {

		Weight::from_ref_time(33_201_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(2 as u64))
			.saturating_add(RocksDbWeight::get().writes(4 as u64))
	}

	fn set_collection_max_supply() -> Weight {

		Weight::from_ref_time(26_893_000 as u64)
			.saturating_add(RocksDbWeight::get().reads(2 as u64))
			.saturating_add(RocksDbWeight::get().writes(1 as u64))
	}


}
