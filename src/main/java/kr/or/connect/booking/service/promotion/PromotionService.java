package kr.or.connect.booking.service.promotion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.booking.dao.promotion.PromotionDao;
import kr.or.connect.booking.dto.promotion.Promotion;

@Service
public class PromotionService {
	@Autowired
	private PromotionDao promotionDao;
	
	@Transactional
	public List<Promotion> getPromotions(){
		return this.promotionDao.selectAll();
	}
}
