import { CONTEXT_MESSAGE } from "../constants/contextMessageMapping";
import { getContextByValue } from "../services/database/context";
import { CacheInstance } from "../services/cache";

export const getMessageReply = async (
  services: {
    database: { getContextByValue: typeof getContextByValue };
    cache: CacheInstance;
  },
  input: {
    conversation_id: string;
    message: string;
  }
) => {


  // TODO: Process the input and return a response based on the input's context
  // Note: All imports are already provided
  //
  // Example input.message "Hello World"
  // Example output.message "Welcome to Adaca."
  // reply_id should be equal to conversation_id
  //

  // Sample Workflow
  // 1. Check Cache, if cache exists, return data
  // 2. If no cache exists, start process again
  // 3. Check each words, use `services.database.getContextByValue` to detect context
  // 4. Map the context to message and send it as a reply, check `src/constants/contextMessageMapping.ts`

  let splittedString = input.message.split(" ");
  let result: string | null = '';
  for (let i in splittedString) {
    let context = await services.database.getContextByValue(splittedString[i]);
    if (context !== null) {
      result = context;
    }
  }

  // Check Cache, if cache exists, return data
  if (Object.keys(services.cache.cache).length !== 0) {
    return {
      reply_id: input.conversation_id,
      message: services.cache.cache[result]
    };
  }

  function isValidCodon(value: string): value is keyof typeof CONTEXT_MESSAGE {
    return value in CONTEXT_MESSAGE;
  }

  if (result !== null && isValidCodon(result)) {
    await services.cache.insert(result, CONTEXT_MESSAGE[result]);
    result = CONTEXT_MESSAGE[result]
  }

  return {
    reply_id: input.conversation_id,
    message: result,
  };
};
