"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ax = __importStar(require("axios"));
class RequestManagementPolicy {
    constructor() {
        /**
         * Current node index
        * @var {number}
        */
        this.current = 0;
        this.nodeUrls = [];
        this.current = 0;
        this.axios = ax.default;
    }
    /**
    * Update alive node after ping
    * @param    {Array<string>} nodeUrls
    * @return   {void}
    */
    updateNodeList(nodeUrls) {
        this.nodeUrls = nodeUrls;
    }
    /**
    * Handle an incoming request and foward it to the
    * current node
    * @param    {Request} req
    * @param    {Response} res
    * @return   {Promise<void>}
    */
    requestHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method, url, headers, body } = req;
            const server = this.nodeUrls[this.current];
            console.log(this.nodeUrls[this.current]);
            this.random;
            try {
                console.log(`${server}${url}`, this.current);
                const response = yield this.axios({
                    url: `${server}${url}`,
                    method: method,
                    headers: headers,
                    data: body
                });
                res.send(response.data);
            }
            catch (err) {
                this.random;
                res.status(500).send("Server error!");
            }
        });
    }
    /**
   * Determine next node by round robin algoritm
   * @return   {number}
   */
    roundRobin() {
        return this.current === (this.nodeUrls.length - 1) ? this.current = 0 : this.current++;
    }
    /**
    * Determine next node by random algoritm
    * @return   {number}
    */
    random() {
        return this.current = Math.floor(Math.random() * this.nodeUrls.length);
    }
    /**
    * Create RequestManagementPolicy instance
    * @return   {RequestManagementPolicy}
    */
    static factory() {
        return new RequestManagementPolicy();
    }
}
exports.default = RequestManagementPolicy;
