export const registerFormControls = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    required: true,
    minLength: 3,
    maxLength: 20,
    componentType: "input",
    errorMessage:
      "Username must be alphanumeric and between 3 and 20 characters long",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
    componentType: "input",
    errorMessage: "Please enter a valid email address",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
    minLength: 5,
    componentType: "input",
    errorMessage: "Password must be at least 5 characters long",
  },
];

export const loginFormControls = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
    componentType: "input",
    errorMessage: "Please enter a valid email address",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
    minLength: 5,
    componentType: "input",
    errorMessage: "Password must be at least 5 characters long",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "versace", label: "Versace" },
      { id: "gucci", label: "Gucci" },
      { id: "louis-vuitton", label: "Louis Vuitton" },
      { id: "burberry", label: "Burberry" },
      { id: "prada", label: "Prada" },
      { id: "levi", label: "Levi's" },
      { id: "calvin-klein", label: "Calvin Klein" },
      { id: "guess", label: "Guess" },
      { id: "other", label: "Other" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  versace: "Versace",
  gucci: "Gucci",
  "louis-vuitton": "Louis Vuitton",
  burberry: "Burberry",
  prada: "Prada",
  levi: "Levi",
  "calvin-klein": "Calvin Klein",
  guess: "Guess",
  other: "Other",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "versace", label: "Versace" },
    { id: "gucci", label: "Gucci" },
    { id: "louis-vuitton", label: "Louis Vuitton" },
    { id: "burberry", label: "Burberry" },
    { id: "prada", label: "Prada" },
    { id: "levi", label: "Levi's" },
    { id: "calvin-klein", label: "Calvin Klein" },
    { id: "guess", label: "Guess" },
    { id: "other", label: "Other" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Country",
    name: "country",
    componentType: "input",
    type: "text",
    placeholder: "Enter your country",
  },
  {
    label: "zipCode",
    name: "zipcode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your zipCode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Email",
    name: "email",
    componentType: "input",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
