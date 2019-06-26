package kr.or.connect.booking.dto.category;

public class Category {
	private int count;
	private int id;
	private String name;

	public Category() {
	}

	public Category(int count, int id, String name) {
		super();
		this.count = count;
		this.id = id;
		this.name = name;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public Integer getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Category [count=" + count + ", id=" + id + ", name=" + name + "]";
	}
}
