from .conver_table import B36_ENCODE


def b36_encode(number: int) -> str:
    result = []
    while number > 0:
        result.append(B36_ENCODE[number % 36])
        number //= 36
    return ''.join(reversed(result))
