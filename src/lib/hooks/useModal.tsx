import { useState } from 'react'

import { ConfirmModal, InfoModal, ModalData } from '@/src/components/common/Modals'

import { ClientModalData } from '../constants/modal_data'

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalData>(ClientModalData.AUTH.LOGIN)

  // Modal 데이터 바꾸기
  const openModal = (modalData: ModalData) => {
    setModalData(modalData)
    setIsOpen(true)
  }

  interface ModalProps {
    onConfirm: () => void
  }

  // 실제 모달 컴포넌트
  const Modal = ({ onConfirm }: ModalProps) => {
    const Comp = modalData.id === 'info' ? InfoModal : ConfirmModal
    return <Comp isOpen={isOpen} data={modalData} onClose={() => setIsOpen(false)} onConfirm={onConfirm} />
  }
  return {
    isOpen,
    modalData,
    openModal,
    Modal,
  }
}

export default useModal
