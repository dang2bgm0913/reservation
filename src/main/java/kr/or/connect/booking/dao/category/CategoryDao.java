package kr.or.connect.booking.dao.category;

import java.util.List;

import kr.or.connect.booking.dto.category.Category;

public interface CategoryDao {
	public List<Category> selectAll();
}
