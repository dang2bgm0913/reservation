package kr.or.connect.booking.dao.product;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.or.connect.booking.dto.product.Product;

public interface ProductDao {
	public List<Product> selectByCategoryId(@Param("start") int start, @Param("limit") int limit, @Param("categoryId") int categoryId);
	public int countByCategoryId(@Param("categoryId") int cateogryId);
}
