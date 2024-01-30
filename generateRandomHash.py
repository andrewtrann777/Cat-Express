import hashlib
import random
import string

def generate_random_string():
    return "".join(random.choice(string.ascii_letters + string.digits) for _ in range(20))

def generate_random_hash():
    return hashlib.sha256(generate_random_string().encode()).hexdigest()

if __name__ == "__main__":
    print(generate_random_hash())
