### User Registration (Lawyer) - Postman Example

To ensure all lawyer profile fields are correctly populated, use the following JSON structure in your Postman request body. 

**URL:** `{{API_URL}}/api/auth/register`
**Method:** `POST`
**Headers:** `Content-Type: application/json`

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "password": "Password123!",
  "role": "LAWYER",
  "fullLegalName": "Jane S. Doe",
  "professionalTitle": "BARRISTER",
  "registrationNumber": "BAR-2024-001",
  "firmName": "Doe & Associates",
  "address": "123 Legal Street, Port Louis, Mauritius",
  "phoneNumber": "+230 5123 4567",
  "mobileNumber": "+230 5987 6543",
  "websiteUrl": "https://www.doelaw.mu",
  "practiceAreas": ["Criminal Law", "Civil Litigation"],
  "experienceYears": 10,
  "jurisdictions": ["Mauritius", "UK"],
  "languagesSpeak": ["English", "French"],
  "biography": "Jane Doe is a seasoned barrister...",
  "valueProposition": "Providing precise legal representation.",
  "awards": "Lawyer of the Year 2023",
  "city": "Port Louis",
  "country": "Mauritius",
  "linkedin_url": "https://linkedin.com/in/janedoe",
  "postal_code": "742CU001"
}
```

> [!WARNING]
> **Data Persistence Note:** 
> Although you can send fields like `city`, `country`, and `linkedin_url` via Postman, the current backend code in `authController.ts` is not currently set up to extract or save them. 
> To enable these fields, we need to update the `register` function to read them from the request body.

#### Key Reminders:
1. **CamelCase**: Use `experienceYears` instead of `experience_years` (unless the backend robust extraction is active).
2. **Enum Values**: `professionalTitle` must be `BARRISTER`, `ATTORNEY`, or `NOTARY`.
3. **Arrays**: `practiceAreas`, `jurisdictions`, and `languagesSpeak` should be arrays of strings.
4. **Role**: Setting `"role": "LAWYER"` is mandatory to trigger the creation of a profile.
```
