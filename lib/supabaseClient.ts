import { createClient } from '@supabase/supabase-js';
import { use_mcp_tool } from './mcp-handlers';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Supabase MCP utility functions
export async function getMCPSupabaseProjectInfo() {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/supabase-community/supabase-mcp',
      tool_name: 'list_projects',
      arguments: {}
    });
    return response;
  } catch (error) {
    console.error('Error fetching Supabase project info:', error);
    return null;
  }
}

export async function getMCPSupabaseTables(projectId: string) {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/supabase-community/supabase-mcp',
      tool_name: 'list_tables',
      arguments: {
        project_id: projectId,
        schemas: ['public']
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching Supabase tables:', error);
    return null;
  }
}

export async function generateSupabaseTypes(projectId: string) {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/supabase-community/supabase-mcp',
      tool_name: 'generate_typescript_types',
      arguments: {
        project_id: projectId
      }
    });
    return response;
  } catch (error) {
    console.error('Error generating TypeScript types:', error);
    return null;
  }
}
