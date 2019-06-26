package kr.or.connect.booking.controller.product;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.booking.service.product.ProductService;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping
	public Map<String, Object> getProductsByCateogyrId(
			@RequestParam(name = "start", required = false, defaultValue = "0") int start, 
			@RequestParam(name = "categoryId", required = false, defaultValue = "0") int categoryId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", this.productService.getProductsByCategoryId(start, categoryId));
		map.put("totalCount", this.productService.getCountByCategoryId(categoryId));
		return map;
	}
}
