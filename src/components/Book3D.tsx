'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

interface Book3DProps {
  frontCover: string
  backCover: string
  spine: string
  slug: string
}

export default function Book3D({ frontCover, backCover, spine, slug}: Book3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const insideBookRef = useRef<THREE.Mesh | null>(null);
  const bookRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return
  
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 267 / 400, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
  
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(400, 550)  // 크기를 줄임
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    mountRef.current.appendChild(renderer.domElement)
  
    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)
  
    const textureLoader = new THREE.TextureLoader()
    const loadTexture = (url: string) => {
      const texture = textureLoader.load(url)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      return texture
    }

    const frontTexture = loadTexture(frontCover)
    const backTexture = loadTexture(backCover)
    const spineTexture = loadTexture(spine)
  
    const insideGeometry = new THREE.BoxGeometry(1.827, 2.52, 0.2961)
    const insideMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const insideBook = new THREE.Mesh(insideGeometry, insideMaterial)
    insideBookRef.current = insideBook
  
    const bookGeometry = new THREE.BoxGeometry(1.8963, 2.6208, 0.30555)
    const bookMaterials = [
      new THREE.MeshPhongMaterial({ color: 0xf5e6d3, side: THREE.DoubleSide }),
      new THREE.MeshPhongMaterial({ map: spineTexture, side: THREE.DoubleSide }),
      new THREE.MeshPhongMaterial({ color: 0xf5e6d3, side: THREE.DoubleSide }),
      new THREE.MeshPhongMaterial({ color: 0xf5e6d3, side: THREE.DoubleSide }),
      new THREE.MeshPhongMaterial({ map: frontTexture, side: THREE.DoubleSide }),
      new THREE.MeshPhongMaterial({ map: backTexture, side: THREE.DoubleSide }),
    ]
    const book = new THREE.Mesh(bookGeometry, bookMaterials)
    bookRef.current = book
  
    scene.add(insideBook)
    scene.add(book)
  
    camera.position.z = 3  // 값을 줄여 카메라를 더 가깝게 배치

    const initialRotationY = -0.4
    const initialRotationX = -0.1  // 위쪽을 바라보도록 값을 증가

    // 초기 회전 각도를 설정합니다.
    book.rotation.y = 0.7
book.rotation.x = -0.6 // 책을 더 많이 위로 기울입니다.
insideBook.rotation.y = 0.7
insideBook.rotation.x = -0.6 // 내부 책도 같은 각도로 기울입니다.


    // 0.5초 후에 애니메이션 시작
    setTimeout(() => {
      gsap.to(book.rotation, {
        y: initialRotationY,
        x: initialRotationX,
        duration: 1,
        ease: "power2.out"
      })
      gsap.to(insideBook.rotation, {
        y: initialRotationY,
        x: initialRotationX,
        duration: 1,
        ease: "power2.out"
      })
    }, 500)
  
    const onMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current!.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
    
      if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        const normalizedX = (mouseX / rect.width) * 2 - 1
        const normalizedY = -(mouseY / rect.height) * 2 + 1
    
        book.rotation.y = normalizedX * 0.3 + initialRotationY
        book.rotation.x = normalizedY * 0.3 + initialRotationX
        insideBook.rotation.y = normalizedX * 0.3 + initialRotationY
        insideBook.rotation.x = normalizedY * 0.3 + initialRotationX
      }
    }
  
    mountRef.current.addEventListener('mousemove', onMouseMove)
  
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
  
    animate()
  
    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      mountRef.current?.removeEventListener('mousemove', onMouseMove)
    }
  }, [frontCover, backCover, spine])

  return <div ref={mountRef} />
}