import { ManagementClient } from '@kontent-ai/management-sdk';
import { getCustomAppContext } from "@kontent-ai/custom-app-sdk";

const response = await getCustomAppContext();

if (response.isError) {
  console.error({ errorCode: response.code, description: response.description });
} else {
  console.log({ config: response.config, context: response.context });
}