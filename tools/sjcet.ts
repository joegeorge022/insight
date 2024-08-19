import type { User } from "@/cache/user";
import { allDepartments } from "@/lib/type";
import { getResponse } from "@/model";
import { tool } from "ai";
import { z } from "zod";
import type { ToolBaseData } from ".";



export const system = "You are a helpful and talkative whatsapp bot named 'Insight', which is built for users at SJCET Palai college. Talk friendly to users like normal and invoke tools is they required you to do."

const userInfo = ({department, email, name, year, role}: User["data"]) =>  
    `Info about user: 
name: ${name}
department: ${allDepartments[department]}
year: ${year}
role: ${role}
email: ${email}
Auth status: logged in
`

export const getUserPrompt = (prompt:string, user?:User["data"], quote?: string) => `Information about User:
${user ? `${userInfo(user)}` : "User haven't logged into the system yet. Maybe reply user to login & access more functionalities" }

User Prompt: ${prompt}
`

export const newestDataAboutSJCET = [
    "SJCET Palai has received accreditation from the National Board of Accreditation (NBA) for several of its undergraduate engineering programs",
    `The college has been awarded NAAC 'A' grade and obtained autonomous status by July 2024`,
    "It is certified under ISO 9001:2008 and holds ISO 9001:2015 and ISO 14001:2015 certifications"
]

export const aboutSJCET = `St. Joseph's College of Engineering and Technology (SJCET), Palai is a private engineering college located in Pala, Kerala, India. 
It was established in 2002 by the Diocesan Technical Education Trust of the Catholic Diocese of Palai and is affiliated with Mahatma Gandhi University, Kottayam and APJ Abdul Kalam Technological University. 
SJCET Palai is approved by the All India Council for Technical Education (AICTE) and offers professional degree programs in engineering and management.

website: https://www.sjcetpalai.ac.in/
Address: Choondacherry, Palai, Kerala 686579
Principal: Dr. V. P. Devassia
`

export const questionTemaplate = (questions: string) => `Data: ${aboutSJCET} 

Newest Information: ${newestDataAboutSJCET.join("\n")}

Instruction: Answer the following questions from above data. If question is not about SJCET, just say "Im not created for these kind of messages"

User's Question: ${questions}
Bot Anwser: `

export const getCommonTools = (availableFunctions:string[], toolBaseData:ToolBaseData) => {
    const availableFunc = availableFunctions.concat(["getInformation", "getEvents"])
    return {
        getInformation: tool({
            description: 'Get answers for any questions/information about SJCET college',
            parameters: z.object({
                question: z.string().describe("The question or the information looking for")
            }),
            execute: async ({ question }) => {
                console.log("Searching for:", question)

                const prompt = questionTemaplate(question)
                const res = await getResponse(prompt, system)

                return res
            },
        }),

        getEvents: tool({
			description: 'Get events details happening/upcoming in SJCET college',
			parameters: z.object({
				eventName: z.string().optional().describe("About a specific event")
			}),
			execute: async ({ eventName }) => {
				
				return `${eventName}... ath kazhinj poyi.. hahaha`
			},
		}),

        actionNotAvailable: tool({
            description: 'If prompt includes any unavailable action to perform',
            parameters: z.object({
                actionName: z.string().describe("unavailable action name")
            }),
            execute: async ({ actionName }) =>  `Action: "${actionName}" is not available`
        }),

        getAvailableFunction: tool({
            description: 'Get available tool functionalities the bot can do',
            parameters: z.object({}),
            execute: async () =>  `${availableFunc.map(e => `- ${e}`).join("\n")}\n\n These are some functions available to you. Login or upgrade your privilage to access more`
        })
    }
}