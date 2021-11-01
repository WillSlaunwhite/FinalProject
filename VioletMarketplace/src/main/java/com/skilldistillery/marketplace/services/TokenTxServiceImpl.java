package com.skilldistillery.marketplace.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.marketplace.entities.TokenTx;
import com.skilldistillery.marketplace.repositories.TokenTxRepository;
import com.skilldistillery.marketplace.repositories.UserRepository;

@Service
public class TokenTxServiceImpl implements TokenTxService {
	@Autowired
	private TokenTxRepository tokenRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<TokenTx> index() {
		List<TokenTx> transfers = tokenRepo.findAll();
		
		return transfers;
	}
	public TokenTx show(int tokenId) {
		TokenTx toShow = tokenRepo.findById(tokenId);
		return toShow;
	}
	@Override
	public List<TokenTx> buyerTransfers(int buyerId) {
		List<TokenTx> buyerTransfers = tokenRepo.findByBuyer(buyerId);
		return buyerTransfers;
	}
	@Override
	public List<TokenTx> sellerTransfers(int sellerId) {
		List<TokenTx> sellerTransfers = tokenRepo.findBySeller(sellerId);
		return sellerTransfers;
	}
	@Override
	public TokenTx create(TokenTx transfer) {
		// TODO Auto-generated method stub
		return null;
	}
//	@Override
//	public Token create(String username, Token token) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public Set<Token> index(String username) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public boolean destroy(String username, int tid) {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//	@Override
//	public Token update(String ownerName, String buyerName, int tid, Token token) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//	
//	
//	
}
