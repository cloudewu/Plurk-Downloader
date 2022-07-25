from .conver_table import B36_DECODE


def is_b36_str(s: str) -> bool:
    return all([c in B36_DECODE for c in s.upper()])
