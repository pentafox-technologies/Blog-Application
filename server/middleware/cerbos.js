const { GRPC } = require("@cerbos/grpc");


const cerbos = new GRPC("localhost:3593", {
  tls: false,
});

exports.isAllowed = async function(principal,resource,action) {

  const cerbosObject = {
    resource: {
      kind: resource,
      policyVersion: "default",
      id: "dummy",
      attributes: resource,
    },
    principal: {
      id: "dummy",
      policyVersion: "default",
      roles: ["member"],
      attributes: principal,
    },
    actions: [action]
  }

  const cerbosCheck = await cerbos.checkResource(cerbosObject);

  const isAuthorized = cerbosCheck.isAllowed(action);

  return isAuthorized;
  
}