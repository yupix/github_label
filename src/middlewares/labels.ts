import { api } from "../api"
import { logger } from "../logging"

export const getLabels = (owner: string, repo:string): Promise<IGitHubLabel[]> => {
    return api.call(
        "GET",
        "/repos/:owner/:repo/labels",
        {},
        { owner, repo },
    ).then(res => {
        if (res.type === 'failed') throw 'failed'
        return res.data
    })
}

export const deleteLabel = (owner: string, repo:string, name:string, headers: HeadersInit) => {
    api.call("DELETE", "/repos/:owner/:repo/labels/:name", {headers}, {owner, repo, name}).then((res) => {
        logger.info("delete")
    })
}
