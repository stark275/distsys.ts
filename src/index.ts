import Node from "./node/Node";
import NodeManager from "./node/NodeManager";
import Server from "./server/Server";

 //NodeManager.pingLoop(3000);

 const server = new Server(8001);
 server.start();


    


