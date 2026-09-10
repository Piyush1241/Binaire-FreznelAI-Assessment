import { RawModelData } from './Model';

export const COMPREHENSIVE_MOCK_MODELS: RawModelData[] = [
  {
    id: "meta-llama/Llama-3.1-8B",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:llama3.1", "bf16-gated", "llama", "text-generation", "conversational", "sft", "vllm", "text-generation-inference", "ollama"],
    downloads: 485000,
    likes: 12400,
    config: { model_type: "llama", architectures: ["LLaMAForCausalLM"] },
    safetensors: { total: 201 }
  },
  {
    id: "meta-llama/Llama-3.1-70B",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:llama3.1", "bf16-gated", "llama", "text-generation", "conversational", "sft"],
    downloads: 320000,
    likes: 8900,
    config: { model_type: "llama", architectures: ["LLaMAForCausalLM"] },
    safetensors: { total: 128 }
  },
  {
    id: "meta-llama/Llama-3.1-405B",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:llama3.1", "bf16-gated", "llama", "text-generation"],
    downloads: 190000,
    likes: 15400,
    config: { model_type: "llama", architectures: ["LLaMAForCausalLM"] },
    safetensors: { total: 256 }
  },
  {
    id: "meta-llama/Llama-3.2-1B-Instruct",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:llama3.1", "bf16-gated", "llama", "text-generation"],
    downloads: 510000,
    likes: 6700,
    config: { model_type: "llama", architectures: ["LLaMAForCausalLM"] },
    safetensors: { total: 1 }
  },
  {
    id: "meta-llama/Llama-3.2-11B-Vision-Instruct",
    pipeline_tag: "vision-language",
    tags: ["pytorch", "transformers", "safetensors", "license:llama3.1", "bf16-gated", "llama", "multimodal", "vision-language"],
    downloads: 230000,
    likes: 4800,
    config: { model_type: "llama_vision", architectures: ["LLaMAForConditionalGeneration"] },
    safetensors: { total: 82 }
  },
  {
    id: "Qwen/Qwen3.6-27B",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:qwen", "bf16", "qwen", "text-generation"],
    downloads: 410000,
    likes: 9200,
    config: { model_type: "qwen3", architectures: ["Qwen3ForCausalLM"] },
    safetensors: { total: 35 }
  },
  {
    id: "Qwen/Qwen3.5-35B-A3B",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:qwen", "bf16", "qwen", "moe"],
    downloads: 290000,
    likes: 6300,
    config: { model_type: "qwen3_5_moe", architectures: ["Qwen3_5MoeForConditionalGeneration"] },
    safetensors: { total: 28 }
  },
  {
    id: "Qwen/QwQ-32B-Preview",
    pipeline_tag: "reasoning",
    tags: ["pytorch", "transformers", "safetensors", "license:qwen", "bf16", "qwen", "reasoning"],
    downloads: 380000,
    likes: 11200,
    config: { model_type: "qwen2", architectures: ["Qwen2ForCausalLM"] },
    safetensors: { total: 18 }
  },
  {
    id: "Qwen/Qwen3-Coder-30B-A3B-Instruct",
    pipeline_tag: "coding",
    tags: ["pytorch", "transformers", "safetensors", "license:qwen", "bf16", "qwen", "mixtral", "coding"],
    downloads: 340000,
    likes: 7900,
    config: { model_type: "qwen3_moe", architectures: ["Qwen3MoeForCausalLM"] },
    safetensors: { total: 32 }
  },
  {
    id: "Qwen/Qwen2.5-Coder-32B-Instruct",
    pipeline_tag: "coding",
    tags: ["pytorch", "transformers", "safetensors", "license:qwen", "bf16", "qwen", "coding"],
    downloads: 460000,
    likes: 10500,
    config: { model_type: "qwen2", architectures: ["Qwen2ForCausalLM"] },
    safetensors: { total: 15 }
  },
  {
    id: "Qwen/Qwen3-VL-32B-Instruct",
    pipeline_tag: "vision-language",
    tags: ["pytorch", "transformers", "safetensors", "license:qwen", "bf16", "qwen", "vision-language"],
    downloads: 270000,
    likes: 5800,
    config: { model_type: "qwen3_vl", architectures: ["Qwen3VLForConditionalGeneration"] },
    safetensors: { total: 35 }
  },
  {
    id: "google/gemma-4-26b-it",
    pipeline_tag: "vision-language",
    tags: ["pytorch", "transformers", "safetensors", "license:gemma", "bf16-gated", "gemma", "multimodal"],
    downloads: 180000,
    likes: 4200,
    config: { model_type: "gemma4", architectures: ["Gemma4ForConditionalGeneration"] },
    safetensors: { total: 24 }
  },
  {
    id: "google/gemma-3-27b-it",
    pipeline_tag: "vision-language",
    tags: ["pytorch", "transformers", "safetensors", "license:gemma", "bf16-gated", "gemma", "vision-language"],
    downloads: 220000,
    likes: 5100,
    config: { model_type: "gemma3", architectures: ["Gemma3ForConditionalGeneration"] },
    safetensors: { total: 18 }
  },
  {
    id: "google/codegemma-7b-it",
    pipeline_tag: "coding",
    tags: ["pytorch", "transformers", "safetensors", "license:gemma", "bf16", "gemma", "coding"],
    downloads: 310000,
    likes: 6400,
    config: { model_type: "codegemma", architectures: ["CodeGemmaForCausalLM"] },
    safetensors: { total: 4 }
  },
  {
    id: "google/shieldgemma-9b-pm",
    pipeline_tag: "text-classification",
    tags: ["pytorch", "transformers", "safetensors", "license:gemma", "fp16", "gemma", "safety-moderation"],
    downloads: 140000,
    likes: 2900,
    config: { model_type: "shieldgemma", architectures: ["ShieldGemmaForConditionalGeneration"] },
    safetensors: { total: 4 }
  },
  {
    id: "google/medgemma-27b-pm",
    pipeline_tag: "medical",
    tags: ["pytorch", "transformers", "safetensors", "license:gemma", "fp16", "gemma", "medical"],
    downloads: 95000,
    likes: 3800,
    config: { model_type: "medgemma", architectures: ["MedGemmaForConditionalGeneration"] },
    safetensors: { total: 3 }
  },
  {
    id: "deepseek-ai/DeepSeek-R1",
    pipeline_tag: "reasoning",
    tags: ["pytorch", "transformers", "safetensors", "license:apache-2.0", "bf16", "deepseek-v3", "reasoning"],
    downloads: 890000,
    likes: 24500,
    config: { model_type: "deepseek_v3", architectures: ["DeepseekV3ForCausalLM"] },
    safetensors: { total: 163 }
  },
  {
    id: "deepseek-ai/DeepSeek-V3",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:apache-2.0", "bf16", "deepseek-v3", "conversational"],
    downloads: 750000,
    likes: 19800,
    config: { model_type: "deepseek_v3", architectures: ["DeepseekV3ForCausalLM"] },
    safetensors: { total: 163 }
  },
  {
    id: "deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct",
    pipeline_tag: "coding",
    tags: ["pytorch", "transformers", "safetensors", "license:apache-2.0", "bf16", "deepseek-v2", "coding"],
    downloads: 420000,
    likes: 8700,
    config: { model_type: "deepseek_v2", architectures: ["DeepseekV2ForCausalLM"] },
    safetensors: { total: 4 }
  },
  {
    id: "mistralai/Mistral-Small-24B-Instruct-2506",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:apache-2.0", "bf16-gated", "mistral"],
    downloads: 360000,
    likes: 7200,
    config: { model_type: "mistral", architectures: ["MistralForCausalLM"] },
    safetensors: { total: 9 }
  },
  {
    id: "mistralai/Codestral-22B-v0.1",
    pipeline_tag: "coding",
    tags: ["pytorch", "transformers", "safetensors", "license:apache-2.0", "bf16", "mistral", "coding"],
    downloads: 490000,
    likes: 11400,
    config: { model_type: "mistral", architectures: ["MistralForCausalLM"] },
    safetensors: { total: 10 }
  },
  {
    id: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    pipeline_tag: "text-generation",
    tags: ["pytorch", "transformers", "safetensors", "license:apache-2.0", "bf16", "mixtral", "moe"],
    downloads: 310000,
    likes: 8300,
    config: { model_type: "mixtral", architectures: ["MixtralForCausalLM"] },
    safetensors: { total: 32 }
  }
];
