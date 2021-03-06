import { Shader } from "./Shader";
import {
  WGSLBlinnPhongFragment,
  WGSLBlinnPhongVertex,
  WGSLPbrFragment,
  WGSLPbrVertex,
  WGSLUnlitFragment,
  WGSLUnlitVertex
} from "../shaderlib";
import { ShaderStage } from "../webgpu";
import { WGSLShadowVertex } from "../shadow/WGSLShadowVertex";
import { WGSLClusterBoundsSource, WGSLClusterLightsSource } from "../lighting/wgsl/WGSLClusterCompute";
import { WGSLSpriteDebugFragment, WGSLSpriteDebugVertex } from "../lighting/sprite/SpriteDebugMaterial";
import { LightManager } from "../lighting";
import {
  WGSLParticleEmission,
  WGSLParticleFragment,
  WGSLParticleSimulation,
  WGSLParticleVertex
} from "../particle/wgsl";
import { ParticleManager } from "../particle/ParticleManager";

/**
 * Internal shader pool.
 * @internal
 */
export class ShaderPool {
  static init(): void {
    Shader.create("unlit", new WGSLUnlitVertex(), ShaderStage.VERTEX, new WGSLUnlitFragment());
    Shader.create("blinn-phong", new WGSLBlinnPhongVertex(), ShaderStage.VERTEX, new WGSLBlinnPhongFragment());
    Shader.create("pbr", new WGSLPbrVertex(), ShaderStage.VERTEX, new WGSLPbrFragment(true));
    Shader.create("pbr-specular", new WGSLPbrVertex(), ShaderStage.VERTEX, new WGSLPbrFragment(false));

    Shader.create("shadow", new WGSLShadowVertex(), ShaderStage.VERTEX);

    //--------------------------------------------------------------------------
    Shader.create(
      "cluster_bounds",
      new WGSLClusterBoundsSource(
        LightManager.TILE_COUNT,
        LightManager.MAX_LIGHTS_PER_CLUSTER,
        LightManager.WORKGROUP_SIZE
      ),
      ShaderStage.COMPUTE
    );

    Shader.create(
      "cluster_lights",
      new WGSLClusterLightsSource(
        LightManager.TILE_COUNT,
        LightManager.MAX_LIGHTS_PER_CLUSTER,
        LightManager.WORKGROUP_SIZE
      ),
      ShaderStage.COMPUTE
    );

    Shader.create(
      "spotlight_sprite_debug",
      new WGSLSpriteDebugVertex(true),
      ShaderStage.VERTEX,
      new WGSLSpriteDebugFragment()
    );
    Shader.create(
      "pointlight_sprite_debug",
      new WGSLSpriteDebugVertex(false),
      ShaderStage.VERTEX,
      new WGSLSpriteDebugFragment()
    );

    //--------------------------------------------------------------------------
    Shader.create("particle_instancing", new WGSLParticleVertex(), ShaderStage.VERTEX, new WGSLParticleFragment());
    Shader.create(
      "particle_emission",
      new WGSLParticleEmission([ParticleManager.PARTICLES_KERNEL_GROUP_WIDTH, 1, 1]),
      ShaderStage.COMPUTE
    );
    Shader.create(
      "particle_simulation",
      new WGSLParticleSimulation([ParticleManager.PARTICLES_KERNEL_GROUP_WIDTH, 1, 1]),
      ShaderStage.COMPUTE
    );
  }
}
