# Monumental Wishlist

## Sprint One - Stock Management

---

### 1st Phase

Arranged from the most essential to the least.

### Add stock item

Need to provide reason for addition; either from `Customer` or `Administrator`

> **Stretch goal** <br>
> if `Customer` then it's a return, then provide reason for return.
> Restock item back into inventory if still in perfect condition.<br>
> Account for the returns, maybe log returned items separately.

- else if `Administrator` then reason is stock taking
- Index Products using their bacode and store their descriptors
  - Make a distiction between `Product` and `Stock item`.
  - `Product` - being something _similar_ to a group, as they will be grouped using their barcode;
    > _eg_ <br>
    > barcode: 88347889734 <br>
    > name: **Typek** <br>
    > description: **white paper A4 x 200 inside**<br>
    > Quantity: **24**
- Use barcode scanner to add `Stock Item,` be able to track whether the item has ever been stocked.
  - Show add new `Product` if barcode doesn't exit.
- Catergorize stock items using departments, like `computer`, `stationary`, or `office` etc.
- Log the `admin`, `supplier`, and `stock price` of the new `Stock Item`.

> **Stretch goal** <br>
> Scrape and autofill `Product` images or descriptions

### Remove stock item

Need to provide reason from removal;
`Customer` or `Administrator`

- if Customer then it's a sale

> Deadline Finish this before the **17th December**
