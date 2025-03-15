import { ManagementClient } from '@kontent-ai/management-sdk';

document.addEventListener('DOMContentLoaded', async () => {
  const settings = await fetch('/config.json').then(res => res.json());

  if (!settings.environmentId || !settings.apiKey) {
    console.error('Missing API key or Environment ID in config.json');
    return;
  }

  const managementClient = new ManagementClient({
    environmentId: settings.environmentId,
    apiKey: settings.apiKey
  });

  const workflowsResponse = await managementClient.listWorkflows().toPromise();
  const container = document.getElementById('mermaid-container');

  workflowsResponse.data.forEach((workflow) => {
    let mermaidDiagram = `flowchart TD\n`;

    workflow.steps.forEach(step => {
      mermaidDiagram += `${step.codename}("${step.name}") -->|\n`;
    });

    const mermaidContainer = document.createElement('div');
    mermaidContainer.className = 'mermaid';
    mermaidContainer.innerHTML = mermaidDiagram;
    container.appendChild(mermaidContainer);
    mermaid.init(undefined, mermaidContainer);
  });
});