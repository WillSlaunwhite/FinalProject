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

import com.skilldistillery.marketplace.entities.Token;
import com.skilldistillery.marketplace.entities.TokenTx;
import com.skilldistillery.marketplace.services.TokenTxService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4301" })
public class TokenTxController {
	@Autowired
	private TokenTxService txSvc;

	/*
	 * THIS IS THE TOKEN ** TX ** CONTROLLER. ENSURE YOU MEANT TO BE HERE AND NOT
	 * THE TOKEN CONTROLLER
	 */

	// Returns All Transfers for a given SELLER

	@GetMapping("transfers/seller/{userId}")
	public List<TokenTx> sellerTransferRecord(HttpServletRequest req, HttpServletResponse resp,
			@PathVariable int userId) {
		return txSvc.sellerTransfers(userId);
	}

	// Returns All Transfers for a given BUYER

	@GetMapping("transfers/buyer/{userId}")
	public List<TokenTx> buyerTransferRecord(HttpServletRequest req, HttpServletResponse resp,
			@PathVariable int userId) {
		return txSvc.sellerTransfers(userId);
	}

	/////////////// GET METHODS ///////////////////

//	return all transfers
	@GetMapping("transfers")
	public List<TokenTx> index(HttpServletRequest req, HttpServletResponse resp) {
		return txSvc.index();
	}

	/////////////// POST METHODS ///////////////////

	@PostMapping("transfers")
	public TokenTx create(HttpServletRequest req, 
			HttpServletResponse resp, 
			@RequestBody TokenTx transfer) {
		txSvc.create(transfer);
		if (transfer == null) {
			resp.setStatus(404);
		}
		return transfer;
	}
}

	/////////////// PUT METHODS ///////////////////
//
//	// method has extra params it probably doesn't need
//	@PutMapping("tokens/{tid}")
//	public Token sellMyToken(HttpServletRequest req, HttpServletResponse resp, Principal principal,
//			@PathVariable int tid) {
//
//		Token token = new Token();
//		token = txSvc.show(principal.getName(), tid);
//
//		if (token == null) {
//			resp.setStatus(404);
//		}
//
//		token = txSvc.update("admin", "secondUser", tid, token);
//		return token;
//	}
//
//	@PutMapping("transfers/{tid}")
//	public Token updateMyToken(HttpServletRequest req, HttpServletResponse resp, Principal principal,
//			@PathVariable int tid) {
//
//		Token token = new Token();
//		token = txSvc.show(principal.getName(), tid);
//
//		if (token == null) {
//			resp.setStatus(404);
//		}
//
//		token = txSvc.update(principal.getName(), tid, token);
//		return token;
//	}
//
//	/////////////// DELETE METHODS ///////////////////
//
//	@DeleteMapping("transfers/{tid}")
//	public void destroy(HttpServletRequest req, HttpServletResponse resp, Principal principal, @PathVariable int tid) {
//
//		if (txSvc.destroy(principal.getName(), tid)) {
//			resp.setStatus(204);
//		} else {
//			resp.setStatus(404);
//		}
//	}
//
//}