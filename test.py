import hashlib

email = "supun2001hasanka@gmail.com"
merchant_id = '1228421'
order_id = f"Order_{email}_{hashlib.md5(email.encode('utf-8')).hexdigest()[:6]}"
amount = 4300  # example amount
currency = 'LKR'
merchant_secret = 'MzQ3NzgxMDAwNjIxNzkzNjAzNzU0ODY2MzQ4MDMzNTk1NTE3NTc='

# Generate the hash
hash_value = hashlib.md5(
    (merchant_id + 
     order_id + 
     "{:.2f}".format(amount) + 
     currency + 
     hashlib.md5(merchant_secret.encode()).hexdigest().upper()
    ).encode()
).hexdigest().upper()

print(hash_value)
