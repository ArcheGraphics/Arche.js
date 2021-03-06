import { ICapsuleCharacterControllerDesc } from "@arche-engine/design";
import { Vector3 } from "@arche-engine/math";
import { PhysicsMaterial } from "../PhysicsMaterial";
import { PhysicsManager } from "../PhysicsManager";
import { CapsuleClimbingMode } from "./CapsuleCharacterController";
import { ControllerNonWalkableMode } from "./CharacterController";

/**
 * A descriptor for a capsule character controller.
 */
export class CapsuleCharacterControllerDesc {
  /** @internal */
  _nativeCharacterControllerDesc: ICapsuleCharacterControllerDesc;

  private _radius: number = 0;
  private _height: number = 0;
  private _climbingMode: CapsuleClimbingMode = CapsuleClimbingMode.EASY;
  private _position = new Vector3();
  private _upDirection = new Vector3(0, 1, 0);
  private _slopeLimit: number = 0;
  private _invisibleWallHeight: number = 0;
  private _maxJumpHeight: number = 0;
  private _contactOffset: number = 0;
  private _stepOffset: number = 0;
  private _density: number = 0;
  private _scaleCoeff: number = 0;
  private _volumeGrowth: number = 0;
  private _nonWalkableMode: ControllerNonWalkableMode = ControllerNonWalkableMode.PREVENT_CLIMBING;
  private _material: PhysicsMaterial;
  private _registerDeletionListener: boolean = false;

  /**
   * The radius of the capsule
   */
  get radius(): number {
    return this._radius;
  }

  set radius(newValue: number) {
    this._radius = newValue;
    this._nativeCharacterControllerDesc.setRadius(newValue);
  }

  /**
   * The height of the controller
   */
  get height(): number {
    return this._height;
  }

  set height(newValue: number) {
    this._height = newValue;
    this._nativeCharacterControllerDesc.setHeight(newValue);
  }

  /**
   * The climbing mode
   */
  get climbingMode(): CapsuleClimbingMode {
    return this._climbingMode;
  }

  set climbingMode(newValue: CapsuleClimbingMode) {
    this._climbingMode = newValue;
    this._nativeCharacterControllerDesc.setClimbingMode(newValue);
  }

  /**
   * The position of the character
   */
  get position(): Vector3 {
    return this._position;
  }

  set position(newValue: Vector3) {
    if (this._position !== newValue) {
      newValue.cloneTo(this._position);
      this._nativeCharacterControllerDesc.setPosition(this._position);
    }
  }

  /**
   * Specifies the 'up' direction
   */
  get upDirection(): Vector3 {
    return this._upDirection;
  }

  set upDirection(newValue: Vector3) {
    newValue.cloneTo(this._upDirection);
    this._nativeCharacterControllerDesc.setUpDirection(this._upDirection);
  }

  /**
   * The maximum slope which the character can walk up.
   */
  get slopeLimit(): number {
    return this._slopeLimit;
  }

  set slopeLimit(newValue: number) {
    this._slopeLimit = newValue;
    this._nativeCharacterControllerDesc.setSlopeLimit(newValue);
  }

  /**
   * Height of invisible walls created around non-walkable triangles
   */
  get invisibleWallHeight(): number {
    return this._invisibleWallHeight;
  }

  set invisibleWallHeight(newValue: number) {
    this._invisibleWallHeight = newValue;
    this._nativeCharacterControllerDesc.setInvisibleWallHeight(newValue);
  }

  /**
   * Maximum height a jumping character can reach
   */
  get maxJumpHeight(): number {
    return this._maxJumpHeight;
  }

  set maxJumpHeight(newValue: number) {
    this._maxJumpHeight = newValue;
    this._nativeCharacterControllerDesc.setMaxJumpHeight(newValue);
  }

  /**
   * The contact offset used by the controller.
   */
  get contactOffset(): number {
    return this._contactOffset;
  }

  set contactOffset(newValue: number) {
    this._contactOffset = newValue;
    this._nativeCharacterControllerDesc.setContactOffset(newValue);
  }

  /**
   * The maximum height of an obstacle which the character can climb.
   */
  get stepOffset(): number {
    return this._stepOffset;
  }

  set stepOffset(newValue: number) {
    this._stepOffset = newValue;
    this._nativeCharacterControllerDesc.setStepOffset(newValue);
  }

  /**
   * Density of underlying kinematic actor
   */
  get density(): number {
    return this._density;
  }

  set density(newValue: number) {
    this._density = newValue;
    this._nativeCharacterControllerDesc.setDensity(newValue);
  }

  /**
   * Scale coefficient for underlying kinematic actor
   */
  get scaleCoeff(): number {
    return this._scaleCoeff;
  }

  set scaleCoeff(newValue: number) {
    this._scaleCoeff = newValue;
    this._nativeCharacterControllerDesc.setScaleCoeff(newValue);
  }

  /**
   * Cached volume growth
   */
  get volumeGrowth(): number {
    return this._volumeGrowth;
  }

  set volumeGrowth(newValue: number) {
    this._volumeGrowth = newValue;
    this._nativeCharacterControllerDesc.setVolumeGrowth(newValue);
  }

  /**
   * The non-walkable mode controls if a character controller slides or not on a non-walkable part.
   */
  get nonWalkableMode(): ControllerNonWalkableMode {
    return this._nonWalkableMode;
  }

  set nonWalkableMode(newValue: ControllerNonWalkableMode) {
    this._nonWalkableMode = newValue;
    this._nativeCharacterControllerDesc.setNonWalkableMode(newValue);
  }

  /**
   * The material for the actor associated with the controller.
   */
  get material(): PhysicsMaterial {
    return this._material;
  }

  set material(newValue: PhysicsMaterial) {
    this._material = newValue;
    this._nativeCharacterControllerDesc.setMaterial(newValue?._nativeMaterial);
  }

  /**
   * Use a deletion listener to get informed about released objects and clear internal caches if needed.
   */
  get registerDeletionListener(): boolean {
    return this._registerDeletionListener;
  }

  set registerDeletionListener(newValue: boolean) {
    this._registerDeletionListener = newValue;
    this._nativeCharacterControllerDesc.setRegisterDeletionListener(newValue);
  }

  constructor() {
    this._nativeCharacterControllerDesc = PhysicsManager._nativePhysics.createCapsuleCharacterControllerDesc();
  }

  /**
   * (re)sets the structure to the default.
   */
  setToDefault() {
    this._radius = 0;
    this._height = 0;
    this._climbingMode = CapsuleClimbingMode.EASY;

    this._position.setValue(0, 0, 0);
    this._upDirection.setValue(0, 1, 0);
    this._slopeLimit = 0;
    this._invisibleWallHeight = 0;
    this._maxJumpHeight = 0;
    this._contactOffset = 0;
    this._stepOffset = 0;
    this._density = 0;
    this._scaleCoeff = 0;
    this._volumeGrowth = 0;
    this._nonWalkableMode = ControllerNonWalkableMode.PREVENT_CLIMBING;
    this._material = null;
    this._registerDeletionListener = false;

    this._nativeCharacterControllerDesc.setToDefault();
  }
}
