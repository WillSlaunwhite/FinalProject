package com.skilldistillery.marketplace.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skilldistillery.marketplace.entities.Bid;

public interface BidRepository extends JpaRepository<Bid, Integer>{

	
	Bid queryById(int id);
//	value="Select * from market_transfer where buyer_id = ?1 or seller_id = ?1
	@Query(value="Select * from bid where buyer_id = ?1 or seller_id = ?1",
			nativeQuery=true)
	List<Bid> findByUser(int userId);
	
	@Query(value="Select * from bid where buyer_id = ?1",
			nativeQuery=true)
	List<Bid> findByBuyer(int buyerId);
	
	@Query(value="Select * from bid where seller_id = ?1",
			nativeQuery=true)
	List<Bid> findBySeller(int sellerId);
	
	
//	List<Bid> getByUser_Username(String username);
	
}
