package kr.or.connect.booking.dao.promotion;

import java.util.List;

import kr.or.connect.booking.dto.promotion.Promotion;

public interface PromotionDao {
	public List<Promotion> selectAll();
}
