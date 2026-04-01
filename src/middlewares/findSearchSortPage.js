"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
//* QUERY HANDLER MIDDLEWARE;

module.exports = async (req, res, next) => {

    // FILTERING & SEARCHING & SORTING & PAGINATION

    //* Filter : mutlak esitlik arar
    //* Search : kismi esitlik arar

    //* FILTERING:
    // URL?filter[fieldName1]=value1&filter[filedName2]=value2
    const filter = req.query?.filter || {}

    //* SEARCHING:
    // URL?search[fieldName1]=value1&search[filedName2]=value2
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    // { "<field>": { "$regex": "pattern" } } -> { title: {"$regex":"test 1"}}
    const search = req.query?.search || {}
    for (let key in search)
        search[key] = { $regex: search[key] }

    //* SORTING:
    // URL?sort[fieldName1]=asc&sort[filedName2]=desc 
    const sort = req.query?.sort || {}

    //* PAGINATION:
    // URL?page=3&limit=15&skip=20

    // LIMIT:
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE) || 20

    // PAGE:
    let page = Number(req.query?.page)
    page = page > 0 ? page : 1

    // SKIP
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page - 1) * limit

    // GetModelList
    res.getModelList = async (Model, populate = null) => {
        return await Model.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit).populate(populate);
    };

    // Details
    res.getModelListDetails = async function (Model) {

        const data = await Model.find({ ...filter, ...search });

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            totalRecords: data.length,
            pages: {
                previos: (page > 1 ? page - 1 : false),
                current: page,
                next: page + 1,
                total: Math.ceil(data.length / limit)
            }
        };

        if (details.pages.next > details.pages.total) details.pages.next = false;
        if (details.totalRecords <= limit) details.pages = false

        return details
    }


    next()
}