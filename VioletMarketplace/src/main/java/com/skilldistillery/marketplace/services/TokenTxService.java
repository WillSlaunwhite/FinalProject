package com.skilldistillery.marketplace.services;

import java.util.List;

import com.skilldistillery.marketplace.entities.Bid;
import com.skilldistillery.marketplace.entities.TokenTx;

public interface TokenTxService {
	
	public List<Bid> userBids(int userId);
	public TokenTx show(int transferId);
	
	public List<TokenTx> buyerTransfers(int buyerId);
	public List<TokenTx> sellerTransfers(int sellerId);

	public TokenTx create(TokenTx transfer);

	List<TokenTx> userIndex(int userId);
	boolean destroyBid(int bidId);
	Bid create(Bid bid);
	List<Bid> userBids(String username);
	
	
	List<TokenTx> tokenIndex(int tokenId);
	List<TokenTx> buyerTransfersByUsername(String username);
	List<TokenTx> sellerTransfersByUsername(String username);
	
}
