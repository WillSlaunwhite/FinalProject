package com.skilldistillery.marketplace.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.marketplace.entities.Bid;
import com.skilldistillery.marketplace.entities.Token;
import com.skilldistillery.marketplace.entities.TokenTx;
import com.skilldistillery.marketplace.services.TokenTxService;
import com.skilldistillery.marketplace.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4301" })
public class TokenTxController {
	@Autowired
	private TokenTxService txSvc;
	
	@Autowired
	private UserService userSvc;

	/*
	 * THIS IS THE TOKEN ** TX ** CONTROLLER. ENSURE YOU MEANT TO BE HERE AND NOT
	 * THE TOKEN CONTROLLER
	 */
	
	
//	GET ALL TRANSFERS FOR A TOKEN BY ID
	@GetMapping("transfers/token/{tokenId}")
	public List<TokenTx> tokenTransferRecord(HttpServletRequest req, HttpServletResponse resp, 
			@PathVariable int tokenId) {
		return txSvc.tokenIndex(tokenId);
	}
	
	
//	did this two different ways eventually, first wy was buyer, created new method to take in username
//	second, probably correct, way was seller, where I just added a usersvc to find a user by name and pass the id, duh, mb
	
//	GET ALL TRANSFERS WHERE USER IS SELLER
	@GetMapping("transfers/seller/{userId}")
	public List<TokenTx> sellerTransferRecord(HttpServletRequest req, HttpServletResponse resp,
			Principal principal) {
		return txSvc.sellerTransfers(userSvc.getUserByUsername(principal.getName()).getId());
	}

	// GET ALL TRANSFERS WHERE USER IS BUYER
	@GetMapping("transfers/buyer/{userId}")
	public List<TokenTx> buyerTransferRecord(HttpServletRequest req, HttpServletResponse resp,
			Principal principal) {
		return txSvc.buyerTransfersByUsername(principal.getName());
	}

//		GET ALL TRANSFERS FOR USER REGARDLESS OF ROLE 
//	@GetMapping("transfers/{userId}")
//	public List<TokenTx> index(HttpServletRequest req, HttpServletResponse resp, @PathVariable int userId) {
//		return txSvc.userIndex(userId);
//	}
	
//		GET ALL TRANSFERS FOR USER REGARDLESS OF ROLE W/ AUTH 
	@GetMapping("transfers/user/{userId}")
	public List<TokenTx> index(HttpServletRequest req, HttpServletResponse resp, 
			Principal principal) {
		return txSvc.userIndex(userSvc.getUserByUsername(principal.getName()).getId());
	}

	/////////////// POST METHODS ///////////////////

//	POST NEW TRANSFER
	@PostMapping("transfers")
	public TokenTx create(HttpServletRequest req, HttpServletResponse resp, @RequestBody TokenTx transfer) {
		txSvc.create(transfer);
		if (transfer == null) {
			resp.setStatus(404);
		}
		return transfer;
	}

//	Changing route for this to allow for auth
//	the thought was I don't want someone to be able to go
//	to my page and see all my bids
//	I think the security config should be set up for this.

///// GET ALL BIDS FOR A USER
	@GetMapping("bids/user/{userId}")
	public List<Bid> userBids(HttpServletRequest req, HttpServletResponse resp, Principal principal) {
		return txSvc.userBids(principal.getName());
	}

///// GET ALL BIDS FOR A TOKEN
	@GetMapping("bids/{tokenId}")
	public List<Bid> tokenBids(HttpServletRequest req, HttpServletResponse resp, @PathVariable int tokenId) {
		return txSvc.userBids(tokenId);
	}

//	DELETE BID BY BID ID
	@DeleteMapping("bids/delete/{bidId}")
	public void destroyBid(HttpServletResponse res, HttpServletRequest req, @PathVariable int bidId) {
		if (txSvc.destroyBid(bidId)) {
			res.setStatus(204);
		} else {
			res.setStatus(401);
		}
	}

// POST NEW BID
	@PostMapping("bids")
	public Bid create(HttpServletRequest req, HttpServletResponse resp, @RequestBody Bid bid) {
		txSvc.create(bid);
		if (bid == null) {
			resp.setStatus(404);
		}
		return bid;
	}
}
