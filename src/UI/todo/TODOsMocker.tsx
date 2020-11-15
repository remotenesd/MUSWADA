import { TODO, TODOPRIORITY, TODOSTATUS } from '../store/core/defs';



var a : TODO;

export const TODOs = [
    {
        content : 'Add redux store to the NIP project.',
        title : 'ADD STORE',
        id : '1',
        status : TODOSTATUS.ACTIVE,
        priority : TODOPRIORITY.CASUAL,
    } as TODO,
    {
        content : 'Add backend functionality to filter out entities.',
        title : '(NIP) BACKEND',
        id : '2',
        status : TODOSTATUS.CANCELLED,
        priority : TODOPRIORITY.CASUAL,
    } as TODO,
    {
        content : 'Complete NIP portal with all basic functionalities.',
        title : 'NIP PORTAL',
        id : '3',
        status : TODOSTATUS.ACTIVE,
        priority : TODOPRIORITY.URGENT,
    } as TODO,
    {
        content : 'ADD user permissions and ownership of entities, as well as sharing.',
        title : 'NIP ADVANCED',
        id : '4',
        status : TODOSTATUS.ACTIVE,
        priority : TODOPRIORITY.CASUAL,
    } as TODO,
    {
        content : 'Add styling and decorations to NIP portal website.',
        title : 'Complete NIP',
        id : '5',
        status : TODOSTATUS.ACTIVE,
        priority : TODOPRIORITY.CASUAL,
    } as TODO,
]

export const TODOadditional = [
    {
        content : 'Additional TODO that could be used for testing purposes.',
        title : 'Additional TODO',
        id : '600',
        status : TODOSTATUS.ACTIVE,
        priority : TODOPRIORITY.CASUAL,
    } as TODO,
]