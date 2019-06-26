package kr.or.connect.booking.controller.category;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.booking.service.category.CategoryService;

@RestController
@RequestMapping(path = "/api/categories")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;

	@GetMapping
	public Map<String, Object> getCategories() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", this.categoryService.getCategories());
		return map;
	}
}
