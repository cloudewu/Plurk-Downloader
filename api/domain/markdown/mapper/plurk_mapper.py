from itertools import starmap
from snakemd import Document, InlineText, Paragraph

from ..entity import PlurkMD, PlurkResponseMD
from ...plurk.entity import PlurkContent, PlurkResponse


def gen_markdown_from_plurk(plurk: PlurkContent) -> PlurkMD:
    doc = Document(plurk.id)

    plurker_info = []
    plurker_info.append(InlineText(plurk.owner.display_name, bold=True))
    plurker_info.append(InlineText(f' (@{plurk.owner.nickname})'))
    if plurk.qualifier:
        plurker_info.append(InlineText(f' {plurk.qualifier}'))
    doc.add_element(Paragraph(plurker_info))

    # TODO: improve content rendering
    doc.add_paragraph(plurk.content_raw)

    plurk_meta = []
    plurk_meta.append(InlineText(f'{plurk.responses_count} responses'))
    if plurk.favorites_count:
        plurk_meta.append(InlineText(f' | {plurk.favorites_count} likes'))
    if plurk.replurkers_count:
        plurk_meta.append(InlineText(f' | {plurk.replurkers_count} replurks'))
    if plurk.coins_count:
        plurk_meta.append(InlineText(f' | {plurk.coins_count} coins'))
    doc.add_element(Paragraph(plurk_meta))

    time_info = []
    time_info.append(InlineText(plurk.post_time, italics=True))
    if plurk.last_edit_time:
        time_info.append(InlineText(' / '))
        time_info.append(InlineText(plurk.last_edit_time, italics=True))
    doc.add_element(Paragraph(time_info))

    doc.add_horizontal_rule()

    print(doc.render())

    responses = list(starmap(gen_response_md_from_plurk_response, enumerate(plurk.responses, start=1)))

    return PlurkMD(
        plurk_id=plurk.id,
        content=doc.render(),
        responses=responses,
    )


def gen_response_md_from_plurk_response(idx: int, response: PlurkResponse) -> PlurkResponseMD:
    doc = Document(response.id)

    plurker_info = []
    plurker_info.append(InlineText(f'{idx}L '))
    plurker_info.append(InlineText(f'{response.owner.display_name}', bold=True))
    plurker_info.append(InlineText(f' (@{response.owner.nickname})'))
    if response.qualifier:
        plurker_info.append(InlineText(f' {response.qualifier}'))
    doc.add_element(Paragraph(plurker_info))

    # TODO: process HTML result
    doc.add_paragraph(response.content_raw or response.content)

    time_info = []
    time_info.append(InlineText(response.post_time, italics=True))
    if response.last_edit_time:
        time_info.append(InlineText(' / '))
        time_info.append(InlineText(response.last_edit_time, italics=True))
    doc.add_element(Paragraph(time_info))

    doc.add_horizontal_rule()

    print(doc.render())

    return PlurkResponseMD(
        id=response.id,
        floor_id=idx,
        content=doc.render(),
    )
