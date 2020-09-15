const { pick } = require('underscore')
const { gql } = require('apollo-server-express')

const typeDef = gql`  
    """
    A type that describes a OutlookCategory
    """
    type OutlookCategory {
        id: String
        key: String
        displayName: String
        color: String
    }

    """
    Input object for OutlookCategory used in Mutation createOutlookCategory
    """
    input OutlookCategoryInput {	
        displayName: String
        color: String
    }

    extend type Query {
        """
        Get Outlook categories
        """
        outlookCategories: [OutlookCategory!]!
    }  

    extend type Mutation {
        """
        Create Outlook category
        """
        createOutlookCategory(category: OutlookCategoryInput!): BaseResult!
    }
`

async function outlookCategories(_obj, _variables, ctx) {
    let categories = await ctx.services.graph.getOutlookCategories()
    return categories.map(c => ({ ...c, key: c.id }))
}

async function createOutlookCategory(_obj, variables, ctx) {
    try {
        const category = await ctx.services.graph.createOutlookCategory(variables.category)
        return { data: JSON.stringify(category), success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

module.exports = {
    resolvers: {
        Query: { outlookCategories },
        Mutation: { createOutlookCategory }
    },
    typeDef
}