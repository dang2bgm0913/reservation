package kr.or.connect.booking.service.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.booking.dao.product.ProductDao;
import kr.or.connect.booking.dto.product.Product;

@Service
public class ProductService {
	public static final int LIMIT = 4;
	@Autowired
	private ProductDao productDao;
	
	@Transactional
	public List<Product> getProductsByCategoryId(int start, int categoryId){
		return this.productDao.selectByCategoryId(start, LIMIT, categoryId);
	}
	
	@Transactional
	public int getCountByCategoryId(int categoryId) {
		return this.productDao.countByCategoryId(categoryId);
	}
	
}
