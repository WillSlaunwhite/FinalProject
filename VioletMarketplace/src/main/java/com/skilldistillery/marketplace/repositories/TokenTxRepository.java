package com.skilldistillery.marketplace.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skilldistillery.marketplace.entities.TokenTx;

public interface TokenTxRepository extends JpaRepository<TokenTx, Integer>{

	
	TokenTx queryById(int id);
	
	@Query(value="Select * from market_transfer where buyer_id = ?1 or seller_id = ?1",
			nativeQuery=true)
	List<TokenTx> findByUser(int userId);
	
	@Query(value="Select * from market_transfer where buyer_id = ?1",
			nativeQuery=true)
	List<TokenTx> findByBuyer(int buyerId);
	
	@Query(value="Select * from market_transfer where seller_id = ?1",
			nativeQuery=true)
	List<TokenTx> findBySeller(int sellerId);
	
	List<TokenTx> findByTokenId(int tokenId);
	
	List<TokenTx> findByBuyer_Username(String username);
	
	List<TokenTx> findBySeller_Username(String username);
	
}
