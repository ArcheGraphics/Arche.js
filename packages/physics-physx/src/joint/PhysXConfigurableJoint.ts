import { PhysXJoint } from "./PhysXJoint";
import { IConfigurableJoint } from "@arche-engine/design";
import { PhysXCollider } from "../PhysXCollider";
import { Quaternion, Vector3 } from "arche-engine";
import { PhysXPhysics } from "../PhysXPhysics";

/**
 * A D6 joint is a general constraint between two actors.
 */
export class PhysXConfigurableJoint extends PhysXJoint implements IConfigurableJoint {
  constructor(
    actor0: PhysXCollider,
    position0: Vector3,
    rotation0: Quaternion,
    actor1: PhysXCollider,
    position1: Vector3,
    rotation1: Quaternion
  ) {
    super();
    this._pxJoint = PhysXPhysics._pxPhysics.createD6Joint(
      actor0?._pxActor,
      position0,
      rotation0,
      actor1?._pxActor,
      position1,
      rotation1
    );
  }

  /**
   * {@inheritDoc IConfigurableJoint.setMotion }
   */
  setMotion(axis: number, type: number) {
    this._pxJoint.setMotion(axis, type);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setHardDistanceLimit }
   */
  setHardDistanceLimit(extent: number, contactDist: number) {
    this._pxJoint.setHardDistanceLimit(PhysXPhysics._pxPhysics.getTolerancesScale(), extent, contactDist);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setSoftDistanceLimit }
   */
  setSoftDistanceLimit(extent: number, stiffness: number, damping: number) {
    this._pxJoint.setSoftDistanceLimit(extent, stiffness, damping);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setHardLinearLimit }
   */
  setHardLinearLimit(axis: number, lowerLimit: number, upperLimit: number, contactDist: number) {
    this._pxJoint.setHardLinearLimit(
      axis,
      PhysXPhysics._pxPhysics.getTolerancesScale(),
      lowerLimit,
      upperLimit,
      contactDist
    );
  }

  /**
   * {@inheritDoc IConfigurableJoint.setSoftLinearLimit }
   */
  setSoftLinearLimit(axis: number, lowerLimit: number, upperLimit: number, stiffness: number, damping: number) {
    this._pxJoint.setSoftLinearLimit(axis, lowerLimit, upperLimit, stiffness, damping);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setHardTwistLimit }
   */
  setHardTwistLimit(lowerLimit: number, upperLimit: number, contactDist: number) {
    this._pxJoint.setHardTwistLimit(lowerLimit, upperLimit, contactDist);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setSoftTwistLimit }
   */
  setSoftTwistLimit(lowerLimit: number, upperLimit: number, stiffness: number, damping: number) {
    this._pxJoint.setSoftTwistLimit(lowerLimit, upperLimit, stiffness, damping);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setHardSwingLimit }
   */
  setHardSwingLimit(yLimitAngle: number, zLimitAngle: number, contactDist: number) {
    this._pxJoint.setHardSwingLimit(yLimitAngle, zLimitAngle, contactDist);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setSoftSwingLimit }
   */
  setSoftSwingLimit(yLimitAngle: number, zLimitAngle: number, stiffness: number, damping: number) {
    this._pxJoint.setSoftSwingLimit(yLimitAngle, zLimitAngle, stiffness, damping);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setHardPyramidSwingLimit }
   */
  setHardPyramidSwingLimit(
    yLimitAngleMin: number,
    yLimitAngleMax: number,
    zLimitAngleMin: number,
    zLimitAngleMax: number,
    contactDist: number
  ) {
    this._pxJoint.setHardPyramidSwingLimit(yLimitAngleMin, yLimitAngleMax, zLimitAngleMin, zLimitAngleMax, contactDist);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setSoftPyramidSwingLimit }
   */
  setSoftPyramidSwingLimit(
    yLimitAngleMin: number,
    yLimitAngleMax: number,
    zLimitAngleMin: number,
    zLimitAngleMax: number,
    stiffness: number,
    damping: number
  ) {
    this._pxJoint.setSoftPyramidSwingLimit(
      yLimitAngleMin,
      yLimitAngleMax,
      zLimitAngleMin,
      zLimitAngleMax,
      stiffness,
      damping
    );
  }

  /**
   * {@inheritDoc IConfigurableJoint.setDrive }
   */
  setDrive(index: number, driveStiffness: number, driveDamping: number, driveForceLimit: number) {
    this._pxJoint.setDrive(index, driveStiffness, driveDamping, driveForceLimit);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setDrivePosition }
   */
  setDrivePosition(position: Vector3, rotation: Quaternion) {
    this._pxJoint.setDrivePosition(position, rotation);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setDriveVelocity }
   */
  setDriveVelocity(linear: Vector3, angular: Vector3) {
    this._pxJoint.setDriveVelocity(linear, angular);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setProjectionLinearTolerance }
   */
  setProjectionLinearTolerance(tolerance: number) {
    this._pxJoint.setProjectionLinearTolerance(tolerance);
  }

  /**
   * {@inheritDoc IConfigurableJoint.setProjectionAngularTolerance }
   */
  setProjectionAngularTolerance(tolerance: number) {
    this._pxJoint.setProjectionAngularTolerance(tolerance);
  }
}
