from .conver_table import B36_DECODE


def b36_decode(s: str) -> int:
    # TODO: handle invalid input
    result = 0
    for c in s.upper():
        result = result * 36 + B36_DECODE[c]
    return result
