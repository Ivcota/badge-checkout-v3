// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { config } from "@keystone-6/core";
import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";
import { lists } from "./schema";
import { PORT, DATABASE_URL, SESSION_MAX_AGE, SESSION_SECRET } from "./config";
import { withAuth } from "./auth";

// Stateless sessions will store the listKey and itemId of the signed-in user in a cookie.
// This session object will be made available on the context object used in hooks, access-control,
// resolvers, etc.
const session = statelessSessions({
  maxAge: SESSION_MAX_AGE,
  // The session secret is used to encrypt cookie data (should be an environment variable)
  secret: SESSION_SECRET,
});

// We wrap our config using the withAuth function. This will inject all
// the extra config required to add support for authentication in our system.
export default withAuth(
  config({
    db: {
      provider: "postgresql",
      useMigrations: true,
      url: DATABASE_URL,
    },
    server: {
      port: PORT,
      cors: {
        origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      },
    },
    lists,
    // We add our session configuration to the system here.
    session,
  })
);
