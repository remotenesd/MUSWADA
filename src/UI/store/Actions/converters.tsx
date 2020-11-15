import { TODOPRIORITY, TODOSTATUS } from "./../core/defs";

export const convertToPriority = (itemPriority) => {
    if (!isNaN(Number(itemPriority)))
    {
        itemPriority = TODOPRIORITY[itemPriority];
    }
    if (itemPriority === undefined || itemPriority === null)
    {
        itemPriority = TODOPRIORITY[TODOPRIORITY.ALL]
    }
    return itemPriority;
}

export const convertToStatus = (itemPriority) => {
    if (!isNaN(Number(itemPriority)))
    {
        itemPriority = TODOSTATUS[itemPriority];
    }
    if (itemPriority === undefined || itemPriority === null)
    {
        itemPriority = TODOSTATUS[TODOSTATUS.ANY]
    }
    // console.log(itemPriority)
    return itemPriority;
}