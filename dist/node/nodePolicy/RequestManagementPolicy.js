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
        this.current = 0;
        this.nodeUrls = [];
        this.current = 0;
        this.axios = ax.default;
    }
    updateNodeList(nodeUrls) {
        this.nodeUrls = nodeUrls;
    }
    requestHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method, url, headers, body } = req;
            const server = this.nodeUrls[this.current];
            console.log(server);
            this.roundRobin();
            //this.random();
            try {
                // Requesting to underlying application server
                const response = yield this.axios({
                    url: `${server}${url}`,
                    method: method,
                    headers: headers,
                    data: body
                });
                // Send back the response data
                // from application server to client
                res.send(response.data);
            }
            catch (err) {
                // Send back the error message
                res.status(500).send("Server error!");
            }
        });
    }
    roundRobin() {
        return this.current === (this.nodeUrls.length - 1) ? this.current = 0 : this.current++;
    }
    random() {
        return this.current = Math.floor(Math.random() * this.nodeUrls.length);
    }
    static factory() {
        return new RequestManagementPolicy();
    }
}
exports.default = RequestManagementPolicy;
