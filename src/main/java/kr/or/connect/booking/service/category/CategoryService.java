package kr.or.connect.booking.service.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.booking.dao.category.CategoryDao;
import kr.or.connect.booking.dto.category.Category;

@Service
public class CategoryService {
	@Autowired
	private CategoryDao categoryDao;

	@Transactional
	public List<Category> getCategories() {
		return this.categoryDao.selectAll();
	}
}
