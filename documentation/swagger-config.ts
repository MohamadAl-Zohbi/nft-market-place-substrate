const swaggerConfig={
    "info": {
        "title": "CEX EXCHANGER",
        "description": "Service to provide the communication between frontend functionality and the database."
    },
    "tags": [
        {
            "name": "Users",
            "description": "users api"
        }  ,  
        {
            "name": "Tokens",
            "description": "Tokens api"
        }  ,
        {
            "name": "Admin",
            "description": "Admin api"
        }  
        ,
        {
            "name": "Content",
            "description": "Content api"
        },
        {
            "name": "Country",
            "description": "Country api"
        } ,
        {
            "name": "Index",
            "description": "Index api"
        } ,
        {
            "name": "Login",
            "description": "Login api"
        } ,
        {
            "name": "Pairs-price",
            "description": "Pairs-price api"
        } ,
        {
            "name": "Settings",
            "description": "Settings api"
        } ,
        {
            "name": "Token-pairs",
            "description": "Token-pairs api"
        } ,
        {
            "name": "Transactions",
            "description": "Transactions api"
        } ,
        {
            "name": "User-Balance",
            "description": "User-Balance api"
        } ,
        {
            "name": "User-liquidity-balance",
            "description": "User-liquidity-balances api"
        } ,
        {
            "name": "Verification-document",
            "description": "Verification-document api"
        } ,
        {
            "name": "Withdraws",
            "description": "Withdraws api"
        } ,
        {
            "name" : "Benefits",
            "description" : "Benefits api"
        },
        {
            "name" : "Active-order",
            "description" : "Active order api"
        },
        {
            "name" : "Faq",
            "description" : "Faq api"
        },
        {
            "name" : "Order-book",
            "description" : "Order book api"
        }
    ],

    "basePath": "/",
    "components": {
        "@schemas": {
            "BadRequestResponse": {
                "type": "object",
                "oneOf": [
                    {
                        "$ref": "#/components/schemas/BadRequest"
                    },
                    {
                        "$ref": "#/components/schemas/ErrorResponse"
                    }
                ]
            },
            "BadRequest": {
                "description": "API Validation error details",
                "type": "object",
                "properties": {
                    "errors": {
                        "type": "array",
                        "x-obfuscate": false,
                        "items": {
                            "$ref": "#/components/schemas/BadRequestErrorDetail"
                        }
                    }
                },
                "required": [
                    "errors"
                ]
            },
            "BadRequestErrorDetail": {
                "type": "object",
                "properties": {
                    "keyword": {
                        "type": "string",
                        "x-obfuscate": false
                    },
                    "dataPath": {
                        "type": "string",
                        "x-obfuscate": false
                    },
                    "schemaPath": {
                        "type": "string",
                        "x-obfuscate": false
                    },
                    "params": {
                        "type": "object",
                        "properties": {
                            "missingProperty": {
                                "type": "string",
                                "x-obfuscate": false
                            }
                        },
                        "x-obfuscate": false
                    },
                    "message": {
                        "type": "string",
                        "x-obfuscate": false
                    }
                }
            },
            "ErrorResponse": {
                "type": "object",
                "description": "Standard error response object.",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "Message with error description.",
                        "x-obfuscate": false
                    }
                },
                "required": [
                    "message"
                ]
            }
        }
    }
}
export default swaggerConfig;