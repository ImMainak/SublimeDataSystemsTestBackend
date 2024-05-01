### 1. User List
- `URL`: http://localhost:4060/api/user_list?search=Ahmedabad&page=1
- Description: Retrieves a list of users with pagination support. You can search users by first name, last name, and city (e.g., Ahmedabad).
- Parameters:
  - `search`: (optional) Search keyword to filter users by first name, last name, and city.
  - `page`: Page number for pagination.

### 2. User Details
- `URL`: http://localhost:4060/api/user_details/:id
- Description: Retrieves users with ID.

### 3. All Unique City List With User Count In The City
- `URL`: http://localhost:4060/api/city_with_user_count
- Description: Retrieves unique city list with user count in the city.
