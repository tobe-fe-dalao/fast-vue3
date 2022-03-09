import request from "@/utils/request.js";

/* 开始 */
/**
 *
 * @param {*} params {}
 * @param {*} uid
 * @param {*} time
 * @returns
 */

export function start(params, uid, time) {
  return request({
    url: `/game/num-puzz/ugc/start?uid=${uid}&time=${time}`,
    method: "post",
    headers: {
      "Allow-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: params,
  });
}
