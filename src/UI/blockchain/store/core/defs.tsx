type user = {
    name : string,
    password : string
};


enum itemTypes {
    FIXED,
    CARRIABLE,
};

enum ORGANISATIONS {
    UND,
    MACRODAT,
    SPE,
    SPM,
    UIGA,
};

type item = {
    tag : number,
    name : string,
    organisation : ORGANISATIONS,
    type : itemTypes,
    comments : string,
    category : string,
};


// TODOs AREA
// TODOs AREA
enum TODOPRIORITY {
    URGENT,
    CASUAL,
    ALL
};

enum TODOSTATUS {
    DONE,
    REPORTED,
    CANCELLED,
    ACTIVE,
    ANY
};

type TODO = {
    id : string,
    title : string,
    content : string,
    priority : TODOPRIORITY,
    status : TODOSTATUS,
};

export type {user, item, TODO};

export { 
    
    itemTypes,
    ORGANISATIONS,
    

    TODOSTATUS,
    TODOPRIORITY,
    
};